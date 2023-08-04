import React from "react";
import { DebounceInput } from "react-debounce-input";
import "./HomePage.css";
import useGetsearch from "../hook/useGetsearch";
import useCopylink from "../hook/useCopylink";

function HomePage() {
  const { searchList, inputText, setInputText, getSearchList } = useGetsearch();
  const { copyLink } = useCopylink();

  const handleInputChange = (e) => {
    getSearchList(e.target.value);
  };

  const handleClick = (text) => {
    setInputText(text);
    getSearchList(text);
  };

  const handleCopyLink = (link) => {
    copyLink(link);
  };

  return (
    <div className="content-container">
      <h1>เที่ยวไหนดี</h1>
      <h2>ค้นหาที่เที่ยว</h2>
      <div className="inputbox-container">
        <label>
          <DebounceInput
            className="style-input"
            minLength={2}
            id="message-text"
            name="message-text"
            type="text"
            value={inputText}
            placeholder="หาที่เที่ยวแล้วไปกัน..."
            debounceTimeout={500}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className="display-search-lists">
        {searchList.map((item, index) => {
          const oneHundredLetter =
            item.description.length > 100
              ? item.description.substring(0, 100) + "..."
              : item.description;
          return (
            <div key={index} className="box-place-display">
              <div className="show-image">
                <img src={item.photos[0]} />
              </div>
              <div className="tourist-attraction-details">
                <div className="title">
                  <a href={item.url} target="_blank">
                    {item.title}
                  </a>
                </div>
                <div className="description">{oneHundredLetter}</div>
                <div className="read-more">
                  <a href={item.url} target="_blank">
                    อ่านต่อ
                  </a>
                </div>
                <div className="category">
                  <div className="category-name">หมวดหมู่</div>
                  {item.tags.map((tags, tagsIndex, arr) => {
                    return (
                      <React.Fragment key={tagsIndex}>
                        {arr.length - 1 !== tagsIndex ? (
                          <button
                            className="tags-category"
                            onClick={() => handleClick(`${tags}`)}
                          >
                            {tags}
                          </button>
                        ) : (
                          <>
                            <span>และ</span>
                            <button
                              className="tags-category"
                              onClick={() => handleClick(`${tags}`)}
                            >
                              {tags}
                            </button>
                          </>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
                <div className="thumbnail">
                  {item.photos.slice(1).map((photo, photoIndex) => {
                    return (
                      <div key={photoIndex} className="image-item">
                        <img src={photo} />
                      </div>
                    );
                  })}
                  <button
                    className="copy-link"
                    onClick={() => handleCopyLink(`${item.url}`)}
                  >
                    <img
                      src="/image/copyLink.png"
                      title="คลิ๊กเพื่อคัดลอกลิงค์"
                    />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;
