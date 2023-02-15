import React from "react";
import Grid from '@material-ui/core/Grid';
import FeatureBox from './FeatureBox';
import flashcardIcon from 'assets/icons/flashcard.png';
import useStyle from './style';
import { ROUTES } from 'constant';

const FEATURE_LIST = [
    {
        title: 'Toeic 300',
        // subTitle:
        //     'Flashcard phương pháp học từ vựng nổi tiếng',
        imgUrl: flashcardIcon,
        to: ROUTES.TOEIC_300,
    },
    {
        title: 'Toeic 600',
        // subTitle:
        //     'Flashcard phương pháp học từ vựng nổi tiếng',
        imgUrl: flashcardIcon,
        to: ROUTES.TOEIC_600,
    },
    {
        title: 'Toeic 900',
        // subTitle:
        //     'Flashcard phương pháp học từ vựng nổi tiếng',
        imgUrl: flashcardIcon,
        to: ROUTES.TOEIC_900,
    },
];


function StoryLevel() {
    const classes = useStyle();
    return (
        <div className="container">
            <div className={classes.bg}>
                <div className="container my-10">
                    {
                        <Grid container
                            direction="column"
                            justifyContent="space-around"
                            alignItems="center"
                        >
                            {FEATURE_LIST.map((box, index) => (
                                <Grid item xs={8} md={8} lg={4} key={index}>
                                    <FeatureBox
                                        imgUrl={box.imgUrl}
                                        title={box.title}
                                        to={box.to}
                                        subTitle={box.subTitle}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    }
                </div>
            </div>
        </div>
    )
}

export default StoryLevel;