import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.scss';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { makeStaticProps } from '../utils/props/propHelper';
import { CommonProps } from '../utils/props/types';

const Home = (
    props: InferGetStaticPropsType<typeof getStaticProps> & CommonProps
) => {
    const { t } = useTranslation('common');
    const { t: t1, ready } = useTranslation('nav');
    // const navitem = "t1('item')";
    const navitem = t1('item');
    return (
        <div>
            {t('title')} {navitem}
            <button
                onClick={() => {
                    let a: any = '';
                    a = null;
                    a.toString();
                    console.log(a);
                }}
            >
                fire error
            </button>
            <button
                onClick={() => {
                    setTimeout(async () => {
                        await fetch('https://sldfjsdbaidu.com');
                    }, 0);
                }}
            >
                fire rejection
            </button>
        </div>
    );
};

export const getStaticProps = makeStaticProps(() => {
    return {
        props: {},
    };
});

export default Home;
