import React from 'react';
import { signInAnonymously } from 'firebase/auth';

import LoginForm from './components/Login';
import SendBirdWrapper from './components/Chat';

import { db, auth } from './utils/Firebase';
import { SENDBIRD_API_BASE_URL } from './utils/globals';

export default function App () {
    const [currentUserDetails, setLoginDetails] = React.useState({ userId: '', nickname: '' });
    const [loader, setLoader] = React.useState(false);
    const [userCreds, setUserCreds] = React.useState(null);
    const [contactList, setContactListDetails] = React.useState([]);
    const [sendbirdUsersList, setSendbirdUsersList] = React.useState([]);

    const ref = db.collection("usersContacts");
    const signInWithGoogleHandler = () => {
        signInAnonymously(auth)
            .then((result) => {
                setUserCreds(result.user);
                getFilteredContactListByStatus("CONFIRMED_VIA_SMS");
            });
    }

    const getFilteredContactListByStatus = (status) => {
        setLoader(true);
        ref.where("status", "==", status)
            .limit(20)
            .get()
            .then((querySnapshot) => {
                const list = [];
                querySnapshot.forEach(async (doc, idx) => {
                    const doc_data = doc.data()
                    const nickname = [doc_data.firstName, doc_data.lastName].join("_").toLocaleLowerCase();
                    list.push({ ...doc_data });
                    if (!sendbirdUsersList.some(user => user.user_id === doc_data.id && user.nickname === nickname)) {
                        const payload = { 
                            nickname,
                            user_id: doc_data.id,
                            profile_url: doc_data.profilePictureUrl 
                        };
                        await createFirestoreUsers(payload);
                    }
                });
                setContactListDetails(list);
            });
    }

    const createFirestoreUsers = async (payload) => {
        try { 
            return await fetch(SENDBIRD_API_BASE_URL + '/users', {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json; charset=utf8',
                    'Api-Token': `${process.env.REACT_APP_SENDBIRD_API_MASTER_TOKEN}`
                },
                body: JSON.stringify({ ...payload })
            });
        } catch(e) {

        }
    }

    const getSendBirdUsersList = () => {
        return fetch(SENDBIRD_API_BASE_URL + '/users', {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json; charset=utf8',
                'Api-Token': `${process.env.REACT_APP_SENDBIRD_API_MASTER_TOKEN}`
            }
        }).then(res => res.json()).then(json => json['users']).catch(e => e);
    }

    const handleSetLoginDetails = (payload) => {
        setLoginDetails(payload);
    }

    React.useEffect(() => {
        getSendBirdUsersList().then((users) => {
            setSendbirdUsersList(users);
            signInWithGoogleHandler();
        });
    }, []);

    React.useEffect(() => {
        if (userCreds && contactList.length > 0) {
            setLoader(false);
        }
    }, [userCreds, contactList]);

    if (loader) {
        <div style={{ height: '100vh', width: '100vw', margin: 'auto' }}>
            Loading...
        </div>
    }

    return (
        <div className="App">
            {!currentUserDetails.userId && !currentUserDetails.nickname && (
                <LoginForm
                    defaultNickName={currentUserDetails.nickname}
                    defaultUserId={currentUserDetails.userId}
                    setLoginDetails={handleSetLoginDetails}
                />
            )}
            {currentUserDetails.userId && currentUserDetails.nickname && (
                <SendBirdWrapper
                    userId={currentUserDetails.userId}
                    nickname={currentUserDetails.nickname}
                />
            )}
        </div>
    );
}