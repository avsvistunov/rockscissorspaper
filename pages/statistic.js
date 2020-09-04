import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from "next/link";
import {MyStorage} from "../public/storage";
import {EQUAL, LOSE, WIN} from "../public/constants";
import {useEffect, useState} from "react";


export default function Statistic() {
    const [dataFromStorage, setDataFromStorage] = useState();

    useEffect(() => {
            setDataFromStorage(MyStorage.getData());
        },
        []);

    const clearStatistic = () => {
        setDataFromStorage(MyStorage.clear());
    };
    return (
        <div className={styles.container}>
            <Head>
                <title>Player statistic</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Game statistic
                </h1>

                <p className={styles.description}>
                    We save your results to storage in your Browser, what's means you can see how much time you win or lose
                </p>

                <div>
                    <table className={styles.statTable}>
                        <thead>
                            <tr>
                                <td>Wins</td>
                                <td>Equal</td>
                                <td>Loses</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{dataFromStorage ? dataFromStorage[WIN] : ''}</td>
                                <td>{dataFromStorage ? dataFromStorage[EQUAL] : ''}</td>
                                <td>{dataFromStorage ? dataFromStorage[LOSE] : ''}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div>
                    <button onClick={clearStatistic}>clear my statistic</button>
                </div>

                <Link href={"/"}>
                    <a className={styles.beautifulLink}>&larr; go home page</a>
                </Link>

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
