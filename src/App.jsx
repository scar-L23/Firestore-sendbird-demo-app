import React from 'react';
import { signInAnonymously } from 'firebase/auth';
import { db, auth } from './utils/Firebase';
import { SENDBIRD_API_BASE_URL } from './utils/globals';

export default function App () {
    const [loader, setLoader] = React.useState(false);
    const [userCreds, setUserCreds] = React.useState(null);
    const [contactList, setContactListDetails] = React.useState([]);
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
                querySnapshot.forEach(async (doc) => {
                    const doc_data = doc.data();
                    list.push({ ...doc_data });
                    await createFirestoreUsers({ 
                        user_id: doc_data.id,
                        nickname: [doc_data.firstName, doc_data.lastName].join("_").toLocaleLowerCase(),
                        profile_url: doc_data.profilePictureUrl 
                    });
                });
                setContactListDetails(list);
            });
    }

    const createFirestoreUsers = async (payload) => {
        return await fetch(SENDBIRD_API_BASE_URL + '/users', {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json; charset=utf8',
                'Api-Token': `${process.env.REACT_APP_SENDBIRD_API_MASTER_TOKEN}`
            },
            body: JSON.stringify({ ...payload })
        })
    }

    React.useEffect(() => {
        signInWithGoogleHandler();
    }, []);

    React.useEffect(() => {
        if (userCreds && contactList.length > 0) {
            setLoader(false);
        }

        // auth.onAuthStateChanged(authUser => {
        //     if (authUser) getFilteredContactListByStatus("CONFIRMED_VIA_SMS");
        // });
    }, [userCreds, contactList]);

    return (
        <div className="App">

        </div>
    );
}