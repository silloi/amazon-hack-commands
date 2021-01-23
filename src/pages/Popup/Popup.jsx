import React, { useState, useEffect } from 'react';
import './Popup.css';

const PARAMETER = {
  REMOVE_MARKET_PLACE: '&rh=p_6%3AAN1VRQENFRJN5',
}

const SORT = {
  REVIEW_RANK: '&s=review-rank',
  POPULARITY_RANK: '&s=popularity-rank',
  SALES_RANK: '&s=sales-rank',
  PRICE_ASC_RANK: '&s=price-asc-rank',
  PRICE_DESC_RANK: '&s=price-desc-rank',
  DATE_DESC_RANK: '&s=date-desc-rank',
  DATE_ASC_RANK: '&s=date-asc-rank',
}

const Popup = () => {
  const [url, setUrl] = useState('')

  const [sort, setSort] = useState('')

  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
      setUrl(tabs[0].url);
    });

    if (url && url.indexOf('www.amazon') > -1 && url.indexOf('s?k=') > -1) {
      setDisabled(false)
    }
  }, [url]);

  const check = () => {
    chrome.tabs.update({ url: url + PARAMETER.REMOVE_MARKET_PLACE });
  };

  const selectSort = (e) => {
    setSort(e.target.value)

    const urlSplit = url.split('&s=')
    const urlLeft = urlSplit[0]
    const urlRight = urlSplit.length > 1 ? urlSplit[1] : ''
    const urlParams = urlRight.split('&').length > 1 ? '&' + urlRight.split('&')[1] : ''

    const urlRejoin = urlLeft + e.target.value + urlParams
    chrome.tabs.update({ url: urlRejoin });
  }

  return (
    <div className="App">
      <header className="App-header">
        <button className="button" disabled={disabled} onClick={check}>マーケットプレイス除外</button>
        <select className="select-box" disabled={disabled} value={sort} onChange={selectSort}>
          <option value="" selected>並べ替える</option>
          <option value={SORT.REVIEW_RANK}>レビューの評価順</option>
          <option value={SORT.POPULARITY_RANK}>人気順</option>
          <option value={SORT.SALES_RANK}>売り上げ順</option>
          <option value={SORT.PRICE_ASC_RANK}>価格の安い順</option>
          <option value={SORT.PRICE_DESC_RANK}>価格の高い順</option>
          <option value={SORT.DATE_ASC_RANK}>発売の新しい順</option>
          <option value={SORT.DATE_DESC_RANK}>発売の古い順</option>
        </select>
      </header>
    </div>
  );
};

export default Popup;
