import React, { useState } from "react";
import { CommunityWrapper, DiscussionItemWrapper } from "./community.styles";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import { useCommunity } from "@/hooks/useCommunity";

const ALLOWED_EMOJIS = ["👍", "❤️", "🔥", "😮", "🤔", "👎"];
const FILTER_TYPES = [
  { label: "All", value: undefined },
  { label: "Questions", value: "question" },
  { label: "Discussion", value: "discussion" },
];

function AuthorAvatar({ name, authorType }) {
  const initials = (name || "U")[0].toUpperCase();
  const bg = authorType === "seller" ? "#fbbf24" : "#e5e7eb";
  const color = authorType === "seller" ? "#78350f" : "#555";
  return (
    <div
      style={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        background: bg,
        color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: "0.8rem",
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

function DiscussionItem({ discussion, productId, currentUserId, onReact, useReplies }) {
  const [showReplies, setShowReplies] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const { postReply } = useCommunity({ productId, enabled: false });
  const { data: repliesData } = useReplies(showReplies ? discussion._id : null);

  const authorName =
    discussion.authorType === "seller" ? "Seller" : `Buyer${String(discussion.authorId).slice(-4)}`;

  const handleReply = async () => {
    if (!replyText.trim()) return;
    setIsPosting(true);
    try {
      await postReply.mutateAsync({ discussionId: discussion._id, content: replyText });
      setReplyText("");
    } finally {
      setIsPosting(false);
    }
  };

  const reactionSummary = ALLOWED_EMOJIS.reduce((acc, emoji) => {
    const count = discussion.reactions?.filter((r) => r.emoji === emoji).length || 0;
    if (count > 0) acc.push({ emoji, count });
    return acc;
  }, []);

  return (
    <DiscussionItemWrapper>
      <div className="discussion__top">
        <AuthorAvatar name={authorName} authorType={discussion.authorType} />
        <div className="author__meta">
          <div className="author__row">
            <p className="author__name">{authorName}</p>
            {discussion.isVerifiedPurchase && (
              <span className="badge verified">Verified Purchase</span>
            )}
            {discussion.isSellerResponse && (
              <span className="badge seller">Seller</span>
            )}
            {discussion.isPinned && (
              <span className="badge pinned">📌 Pinned</span>
            )}
          </div>
          <p className="discussion__type">{discussion.type}</p>
        </div>
      </div>

      <p className="discussion__content">{discussion.content}</p>

      <div className="discussion__actions">
        <div className="reaction__group">
          {reactionSummary.map(({ emoji, count }) => (
            <button key={emoji} onClick={() => onReact({ targetId: discussion._id, targetType: "discussion", emoji, productId })}>
              {emoji} {count}
            </button>
          ))}
        </div>

        {ALLOWED_EMOJIS.filter((e) => !reactionSummary.find((r) => r.emoji === e)).map((emoji) => (
          <button
            key={emoji}
            onClick={() => onReact({ targetId: discussion._id, targetType: "discussion", emoji, productId })}
            style={{ opacity: 0.4 }}
          >
            {emoji}
          </button>
        ))}

        <button onClick={() => setShowReplies((v) => !v)}>
          {showReplies ? "Hide" : `Replies (${discussion.replyCount || 0})`}
        </button>
      </div>

      {showReplies && (
        <div className="replies__section">
          {repliesData?.data?.replies?.map((reply) => (
            <div key={reply._id} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <AuthorAvatar
                  name={reply.authorType === "seller" ? "Seller" : "Buyer"}
                  authorType={reply.authorType}
                />
                <div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ fontWeight: 600, fontSize: "0.85rem" }}>
                      {reply.authorType === "seller" ? "Seller" : `Buyer${String(reply.authorId).slice(-4)}`}
                    </span>
                    {reply.isSellerResponse && (
                      <span className="badge seller" style={{ fontSize: "0.65rem", padding: "2px 6px", borderRadius: 4, background: "#fef3c7", color: "#92400e", fontWeight: 600 }}>
                        Seller
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: "0.88rem", margin: "4px 0 0", color: "#444" }}>{reply.content}</p>
                </div>
              </div>
            </div>
          ))}

          {currentUserId && (
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <input
                style={{ flex: 1, padding: "8px 10px", borderRadius: 8, border: "1px solid rgba(187,187,187,0.4)", fontSize: "0.85rem", outline: "none" }}
                placeholder="Write a reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <button
                style={{ padding: "8px 16px", background: "var(--orrsiPrimary)", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontSize: "0.85rem", fontWeight: 600 }}
                onClick={handleReply}
                disabled={isPosting}
              >
                {isPosting ? "..." : "Reply"}
              </button>
            </div>
          )}
        </div>
      )}
    </DiscussionItemWrapper>
  );
}

export default function CommunityDiscussions({ productId, sellerId, user }) {
  const [postContent, setPostContent] = useState("");
  const [postType, setPostType] = useState("discussion");
  const [activeFilter, setActiveFilter] = useState(undefined);
  const [isPosting, setIsPosting] = useState(false);

  const { discussionsData, isLoading, postDiscussion, react, useReplies } = useCommunity({
    productId,
    enabled: !!productId,
  });

  const discussions = discussionsData?.data?.discussions || [];

  const handlePost = async () => {
    if (!postContent.trim()) return;
    setIsPosting(true);
    try {
      await postDiscussion.mutateAsync({
        productId,
        sellerId,
        content: postContent,
        type: postType,
      });
      setPostContent("");
    } finally {
      setIsPosting(false);
    }
  };

  const handleReact = (args) => {
    if (!user) return;
    react.mutate(args);
  };

  return (
    <CommunityWrapper>
      <FlexibleDiv className="community__header">
        <h3>Community ({discussions.length})</h3>
        <div className="filter__tabs">
          {FILTER_TYPES.map((f) => (
            <button
              key={String(f.value)}
              className={activeFilter === f.value ? "active" : ""}
              onClick={() => setActiveFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </FlexibleDiv>

      {user && (
        <div className="post__box">
          <textarea
            placeholder="Ask a question or start a discussion..."
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            maxLength={2000}
          />
          <div className="post__box__footer">
            <div className="type__select">
              <label>
                <input
                  type="radio"
                  name="postType"
                  value="discussion"
                  checked={postType === "discussion"}
                  onChange={() => setPostType("discussion")}
                />
                Discussion
              </label>
              <label>
                <input
                  type="radio"
                  name="postType"
                  value="question"
                  checked={postType === "question"}
                  onChange={() => setPostType("question")}
                />
                Question
              </label>
            </div>
            <button className="post__btn" onClick={handlePost} disabled={isPosting || !postContent.trim()}>
              {isPosting ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      )}

      {isLoading ? (
        <p style={{ color: "#888", fontSize: "0.9rem" }}>Loading discussions...</p>
      ) : discussions.length === 0 ? (
        <p style={{ color: "#888", fontSize: "0.9rem" }}>
          No discussions yet. Be the first to ask a question!
        </p>
      ) : (
        <div className="discussion__list">
          {discussions
            .filter((d) => !activeFilter || d.type === activeFilter)
            .map((d) => (
              <DiscussionItem
                key={d._id}
                discussion={d}
                productId={productId}
                currentUserId={user?._id || user?.id}
                onReact={handleReact}
                useReplies={useReplies}
              />
            ))}
        </div>
      )}
    </CommunityWrapper>
  );
}
