import React from "react";

const ChatBot = () => {
  return (
    <>
      <div className="chatbot">
        <form>
          <label>Ask me a question</label>
          <input
            type="text"
            id="query"
            name="query"
            onChange={(e) => console.log(e.target.value)}
          />
          <input
            type="submit"
            value="Submit"
            onSubmit={(e) => console.log({ e })}
          />
        </form>
      </div>
    </>
  );
};

export default ChatBot;
