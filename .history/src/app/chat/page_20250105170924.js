import React from 'react'
import Chat from '../../component/Chat'
import { useRouter } from 'next/router'
import styles from './chat.module.css'

function chat
() {
  return (
    <>
    <Chat />
    </>
  )
}

export default chat
function ChatPage() {
    const router = useRouter();

    const handleGoBack = () => {
        router.push('/');
    };

    return (
        <>
            <Chat />
            <button className={styles.goBackButton} onClick={handleGoBack}>
                Go Back to Home
            </button>
        </>
    );
}

export default ChatPage;