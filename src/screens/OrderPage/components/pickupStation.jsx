import { PickupStationWrapper } from "./orderComponent.styled";
import { FaCarSide } from "react-icons/fa";

export const PickupStation = () => {
  return (
    <PickupStationWrapper>
      <span className="icon">
        <FaCarSide />
      </span>
      <div>
        <h5 className="title">Delivery Address</h5>
          <span>
            <p>Delivery Fees</p><p className="arrival_details">₦ 760</p>
          </span>
          <span>
            <p>Arriving at pickup station between</p><p className="arrival_details"> 06 November & 08 November</p>
          </span>
          <span className="bottom_text">
            <p>Delivery Fee:</p>
            <p className="green_text">N500</p>
          </span>
      </div>
    </PickupStationWrapper>
  );
};
