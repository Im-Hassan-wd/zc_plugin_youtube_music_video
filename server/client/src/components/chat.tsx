import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import ChatHeader from "./common/chatHeader";
import ChatItem from "./common/chatItem";
import ChatInput from "./common/chatInput";

import { chatSelect } from "../store/chatsSlice";
import { uiSelect } from "../store/uiSlice";
import { syncArray } from "../utils/syncArray"

function Chat(props) {
  const chat = useSelector(chatSelect.allChat);
  const showChat = useSelector(uiSelect.showChat);
  const scroller = useRef(null);
  const [ chats, setChats] = useState(chat);

  useEffect(() => {
    setChats(syncArray(chats, chat));
  }, [chat]);

  const scrollToBottom = () => {
    scroller.current.scrollIntoView(false);
  };

  useEffect(() => {
    if (showChat) {
      scrollToBottom();
    }
  });

  if (!showChat) return null;

  function handleFocus() {
    const mediaQuery = window.matchMedia("(max-width: 1000px)");
    const mediaQueryPhone = window.matchMedia("(max-width: 450px)");
    const chatItemGroup =
      document.querySelector<HTMLElement>(".chat-item-group");
    const chatWrapper = document.querySelector<HTMLElement>(".chat-wrapper");

    if (mediaQueryPhone.matches) {
      chatItemGroup.style.maxHeight = "180px";
      chatWrapper.style.position = "fixed";
      chatWrapper.style.top = "40px";
    }

    else if (mediaQuery.matches) {
      chatItemGroup.style.maxHeight = "200px";
      chatWrapper.style.position = "fixed";
      chatWrapper.style.top = "60px";
    }
  }

  function handleBlur() {
    const mediaQuery = window.matchMedia("(max-width: 1000px)");
    const chatItemGroup =
      document.querySelector<HTMLElement>(".chat-item-group");
    const chatWrapper = document.querySelector<HTMLElement>(".chat-wrapper");

    if (mediaQuery.matches) {
      chatItemGroup.style.maxHeight = "450px";
      chatWrapper.style.position = "fixed";
      chatWrapper.style.top = "70px";
    }
  }

  return (
    <Wrapper className="chat-wrapper">
      <ChatHeader />

      <div className="chat-item-group">
        {chats.map((chat, index) => (
          <ChatItem key={index} {...chat} />
        ))}

        <div className="scroller" ref={scroller}></div>
      </div>
      <ChatInput handleFocus={handleFocus} handleBlur={handleBlur} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  width: 420px;
  background-color: white;
  box-shadow: 1px 3px 5px #b4b2b2;
  position: relative;
  z-index: 100;

  .chat-item-group {
    flex-grow: 1;
    overflow-y: scroll;
    min-height: 121px;
    padding-left: 16px;
    padding-right: 30px;
    margin-top: 24px;
    height: 440px;
  }

  .chat-item-group::-webkit-scrollbar {
    width: 3px;
  }
  .chat-item-group::-webkit-scrollbar-thumb {
    background-color: hsla(160, 100%, 36%, 1);
    width: 3px;
  }

  @media (max-width: 1000px) {
    background-color: transparent;
    width: 350px;
    margin-left: 0px;
    margin: 0 30px;

    .chat-item-group {
      max-height: 450px;
      margin-top: 2px;
      background-color: white;
      padding-right: 30px;
    }
  }

  @media (max-width: 400px) {
    width: 350px;
    background: white;
    background-color: white;
    box-shadow: 1px 3px 5px #b4b2b2;
    position: relative;
    z-index: 100;
  }
`;

export default Chat;
