import React, { useState, useEffect } from 'react';
import useStyle from './popup';
import wordApi from 'apis/wordApi';

function Word(props) {
    const [isShowPopup, setShowPopup] = useState(false);
    const { id, word } = props;
    const classes = useStyle();

    const showPopupMean = () => {
        setShowPopup(true);
    }

    const closePopupMean = () => {
        setShowPopup(false);
    }

    return (
        <>
            <div style={{ cursor: 'pointer', display: "inline-block", position: "relative" }} onMouseLeave={closePopupMean} onMouseEnter={showPopupMean} >
                <p style={{ textDecoration: 'underline', color: "#000" }}>
                    {word}
                </p>
                {
                    isShowPopup && <PopupMean id={id} />
                }
            </div>
        </>
    );
}

const PopupMean = (props) => {
    const classes = useStyle();
    const [word, setword] = useState({});
    const [load, setLoad] = useState(true);

    const loadData = async () => {
        var result = await wordApi.getMeanOfWord(props.id);
        setword(result.data.data);
        setTimeout(() => {
            setLoad(false);
        }, 300);
    }

    useEffect(async () => {
        loadData();
    }, []);
    return (
        <div className={classes.mean}>
            {
                load ?
                    <div className={classes.loader}></div> :
                    <div style={{fontSize: "14px", fontWeight: "500"}}>
                        <p>{word.word}</p>
                        <p style={{fontSize: "12px", fontStyle: "italic"}}>{word.phonetic}</p>
                        <p>{word.mean}</p>
                    </div>
            }
        </div>
    )
}

export default Word;