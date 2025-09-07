   import GeneralLayout from "@/components/layouts/GeneralLayout/generalLayout";
import { SearchWrapper } from "./search.styles";
import TextField from "@/components/lib/TextField";
import { SearchOutlined } from "@ant-design/icons";
import { CiSearch as SearchIcon } from "react-icons/ci";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import { FaArrowsRotate as RotateIcon } from "react-icons/fa6";

export default function Search() {
  const recentSearched = [
    "Infinix Smart 7 Pro",
    "Nokia Redmi 210",
    "Samsung A40",
  ];
  return (
    <SearchWrapper>
      <FlexibleDiv className="content__wrap">
        <TextField
          border="border: 1.5px solid rgba(224, 224, 224, 0.60)"
          style={{
            boxShadow:
              "0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px -1px 2px 0px rgba(0, 0, 0, 0.10) inset",
          }}
          prefix={<SearchIcon size={22} />}
          placeholder="Search for anything here..."
          className="search__textbox"
        />
        <FlexibleDiv
          className="recent__searched__box"
          justifyContent="space-between"
          alignItems="flex-start"
          flexWrap="nowrap"
        >
          <div>
            <p className="header__text">Recent Searched</p>
            {recentSearched.map((sgn, idx) => (
              <p className="single__search__result" key={idx}>
                <div className="icon__wrapper">
                  <RotateIcon color="#777777" />
                </div>
                <span>{sgn}</span>
              </p>
            ))}
          </div>
          <div>
            <p className="clear__all__text"> Clear all</p>
          </div>
        </FlexibleDiv>
      </FlexibleDiv>
    </SearchWrapper>
  );
}
