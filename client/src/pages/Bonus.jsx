import React from "react";

const Bonus = () => {
  return (
    <div>
      <div data-v-9b052130="" className="bonus_top">
        <div data-v-9b052130="" className="title">
          <p data-v-9b052130=""> Invite to earn commission</p>
          <div data-v-9b052130="" className="coin">
            <img
              data-v-9b052130=""
              src="https://dehaatll.net/static/png/coin1-ebc04eac.png"
            />
          </div>
        </div>
      </div>

      <div className="key">
        <div className="key_title">Key</div>
        <div className="hl-input-box link">
          <div className="var-input var--box input">
            <div className="var-field-decorator var--box var-field-decorator--outlined">
              <div
                className="var-field-decorator__controller"
                style={{ cursor: "text", overflow: "hidden" }}
              >
                <div className="var-field-decorator__icon var-field-decorator--icon-non-hint" />
                <div className="var-field-decorator__middle var-field-decorator--middle-non-hint">
                  <input
                    className="var-input__input"
                    autoComplete="new-password"
                    id="var-input-562"
                    type="text"
                    placeholder="Please enter the bonus key"
                  />
                </div>
                <span className="var-field-decorator__placeholder-text var--ellipsis">
                  Please enter the bonus key
                </span>
                <div className="var-field-decorator__icon var-field-decorator--icon-non-hint" />
              </div>
            </div>
          </div>
        </div>
        <button
          className="var-button var--box var-button--large var--flex var-button--block var-button--primary var-elevation--0 button"
          type="button"
        >
          <div className="var-button__content">Get</div>
          <div className="var-hover-overlay" />
        </button>
        <div className="coin">
          <img src="https://dehaatll.net/static/png/coin2-93dd615f.png" />
        </div>
      </div>
    </div>
  );
};

export default Bonus;
