import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {useEffect, useState} from "react";
import Link from "next/link";
import {MyStorage} from "../public/storage"
import {EQUAL, LOSE, LOSE_MSG, WIN, WIN_MSG} from "../public/constants"

const random = (min, max) => {
    // получить случайное число от (min-0.5) до (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}


export default function Home() {
    const FIGURES = {
        SCISSORS: 1,
        PAPER: 2,
        ROCK: 3
    }
    const [activeFigureId, setActiveFigureId] = useState(1);
    const [opponentFigureId, setOpponentFigureId] = useState(0);
    const [result, setResult] = useState('');

    useEffect(() => {
        let result = '';

        if (!opponentFigureId) {
            return;
        }
        if (opponentFigureId === activeFigureId) {
            result = 'Your\'s chances are equal';
            MyStorage.add(EQUAL);
        } else {
            if (
                activeFigureId === FIGURES.SCISSORS && (opponentFigureId === FIGURES.PAPER) ||
                activeFigureId === FIGURES.PAPER && (opponentFigureId === FIGURES.ROCK) ||
                activeFigureId === FIGURES.ROCK && (opponentFigureId === FIGURES.SCISSORS)
            ) {
                result = WIN_MSG;
                MyStorage.add(WIN);
            } else {
                result = LOSE_MSG;
                MyStorage.add(LOSE);
            }
            switch (activeFigureId) {
                case FIGURES.SCISSORS:
                    result = (opponentFigureId === FIGURES.PAPER) ? WIN_MSG : LOSE_MSG;
                    break;
                case FIGURES.PAPER:
                    result = (opponentFigureId === FIGURES.ROCK) ? WIN_MSG : LOSE_MSG;
                    break;
                case FIGURES.ROCK:
                    result = (opponentFigureId === FIGURES.SCISSORS) ? WIN_MSG : LOSE_MSG;
                    break;
            }
        }

        if (result) {
            setResult(result);
        }
    }, [opponentFigureId]);

    // reset result when user changes own selected figure
    useEffect(() => setResult(''), [activeFigureId]);

    const rArrowClick = () => {
        if (activeFigureId === FIGURES.ROCK) {
            setActiveFigureId(FIGURES.SCISSORS);
        } else {
            setActiveFigureId(prevState => prevState + 1);
        }
    };
    const lArrowClick = () => {
        if (activeFigureId === FIGURES.SCISSORS) {
            setActiveFigureId(FIGURES.ROCK);
        } else {
            setActiveFigureId(prevState => prevState - 1);
        }
    };

    const makeDecision = () => {
        setOpponentFigureId(randomFigure());
    }

    const makeUserRandomDesicion = () => {
        setResult('');
        setActiveFigureId(randomFigure())
    }

    const randomFigure = () => {
        return random(1, 3);
    }

    const FigureArea = (props) => {
        const selected = props.selected || -1;
        if (selected === -1) return (<>?</>);
        console.log(`render FigureArea for ${props.owner}`)
        return (
            <>
                <img src="/images/scissors.svg" alt="scissors"
                     className={styles.figure + ' ' + (selected === 1 ? styles.active : '')}/>
                <img src="/images/paper.svg" alt="paper"
                     className={styles.figure + ' ' + (selected === 2 ? styles.active : '')}/>
                <img src="/images/stone.svg" alt="rock"
                     className={styles.figure + ' ' + (selected === 3 ? styles.active : '')}/>
            </>
        );
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Rock - Scissors - Paper</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Let's play into "Rock - Scissors - Paper"
                </h1>

                <p className={styles.description}>
                    You have only stone, scissors and paper and should win your opponent
                </p>

                {
                    result ?
                    <div className={styles.resultArea}>
                        {result}
                    </div>
                    : ''
                }

                <div className={styles.playArea}>
                    <div>
                        <div className={styles.titleArea}>Your choice</div>
                        <div className={styles.playerArea}>
                            <div className={styles.arrow} onClick={lArrowClick}>&larr;</div>
                            <div className={styles.choiceContainer}>
                                <FigureArea selected={activeFigureId} owner='player'/>
                            </div>
                            <div className={styles.arrow} onClick={rArrowClick}>&rarr;</div>
                        </div>
                        <button onClick={makeUserRandomDesicion}>random choice</button>
                    </div>
                    <div className={styles.actionArea}>
                        <button onClick={makeDecision}>let-s play</button>
                        <Link href="/statistic">
                            <a className={styles.beautifulLink}>show my game statistic &rarr;</a>
                        </Link>
                    </div>
                    <div>
                        <div className={styles.titleArea}>Opponent choice</div>
                        <div className={styles.choiceContainer}>
                            <FigureArea selected={opponentFigureId} owner='opponent'/>
                        </div>
                    </div>
                </div>

            </main>

            <footer className={styles.footer}>
                <a
                    href="https://github.com/avsvistunov"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by avsvistunov
                </a>
            </footer>
        </div>
    );
}
