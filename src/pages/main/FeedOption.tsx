import { useDisclosure } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteConfirm from "UI/DeleteConfirm";
import useClickOutside from "UI/header/useClickOutside";
import styles from "./FeedOption.module.scss";
import { HiEllipsisVertical } from "react-icons/hi2";

const myFeedDropDownMenu = ["수정하기", "삭제하기"];

const FeedOption = (props: any) => {
  const data = props.data;
  const LoginUserData = props.LoginUserData;
  const refetchFeed = props.feedRefetch;
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [feedOption, setFeedOption] = useState(false);
  const feedIdRef = useRef<string>();
  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef, () => {
    setFeedOption(false);
  });

  /**feed 드롭다운 메뉴 이벤트 */
  const dropDownMenuEvent = (e: React.MouseEvent, data: any) => {
    const eventTarget = e.target as HTMLInputElement;
    const menuType = eventTarget.innerText;
    if (menuType === "수정하기") return navigate("/upload", { state: data });
    if (menuType === "삭제하기") {
      feedIdRef.current = eventTarget.value;
      return onOpen();
    }
  };

  return (
    <>
      <DeleteConfirm
        onClose={onClose}
        isOpen={isOpen}
        feedId={feedIdRef.current}
        refetch={refetchFeed}
      />

      {LoginUserData?.id === data.user?.pk && (
        <button
          className={styles.dropDownBtn}
          value={data.id}
          onClick={() => {
            setFeedOption(!feedOption);
          }}
        >
          <HiEllipsisVertical size="26" />
        </button>
      )}
      {feedOption && (
        <ul className={styles.menu} ref={dropdownRef}>
          {myFeedDropDownMenu.map((menu) => (
            <li
              className={styles.menuList}
              key={menu}
              value={data.id}
              onClick={(e) => dropDownMenuEvent(e, data)}
            >
              {menu}
            </li>
          ))}
        </ul>
      )}
      {/* </div> */}
    </>
  );
};

export default FeedOption;