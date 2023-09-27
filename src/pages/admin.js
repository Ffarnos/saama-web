import styled from "styled-components";
import ResponsiveText from "../components/apis/ResponsiveText";
import {getDatabase, ref, get, update} from "firebase/database";

import {app} from "../../gatsby-browser";
import {useEffect, useState} from "react";
import {TextField} from "@mui/material";
import {getAuth} from "firebase/auth";
import {navigate} from "gatsby";

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState('')
    const [hasPermission, setHasPermission] = useState(false);

    useEffect(() => {
        const authUnsubscribe = getAuth(app).onAuthStateChanged((user) => {
            if (user) {
                const usersRef = ref(getDatabase(app), 'users/' + user.uid);
                get(usersRef)
                    .then((snapshot) => {
                        if (snapshot.exists() && (snapshot.val().role === 'admin'))
                            setHasPermission(true)
                        else {
                            navigate('/404')
                        }

                    })
                    .catch((error) => {
                        console.error('Error al obtener el rol del usuario:', error);
                    });
            } else navigate('/404')
        });

        return () => {
            authUnsubscribe();
        };
    });
    const fetchUsers = async () => {
        const usersRef = ref(getDatabase(app), 'users');

        get(usersRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const userArray = [];
                    snapshot.forEach((userSnapshot) => {
                        const user = userSnapshot.val();
                        const userId = userSnapshot.key;
                        if (user.role !== 'admin') {
                            userArray.push({...user, key: userId});
                        }
                    });
                    userArray.sort((a, b) => b.createdAt - a.createdAt);

                    setUsers(userArray);
                } else {
                    console.log('No se encontraron usuarios.');
                }
            })
            .catch((error) => {
                console.error('Error al obtener los usuarios:', error);
            });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Función para cambiar el estado de habilitación en Firebase
    const toggleEnable = (user) => {
        const usersRef = ref(getDatabase(app), 'users');
        const updatedUser = { ...user, role: user.role === 'active' ? 'user' : 'active' };
        update(usersRef, {
            [user.key]: updatedUser,
        }).then(r => fetchUsers())
    }

    const includeSearch = string => string
        .toLowerCase()
        .includes(filter.toLowerCase());

    const matchUser = user => includeSearch(user.name) ||
        includeSearch(user.surname) || includeSearch(user.email) || includeSearch(user.username);

    const filteredUsers = users.filter(matchUser);

    return <>
            <CardWrapper>
                {hasPermission ? <div>
                <ResponsiveText scale={1} color={"#1f1e1e"}>
                    ADMIN PANEL
                </ResponsiveText>
                <SearchContainer>
                    <TextField id="search" label="Buscar" variant="standard" margin="normal"
                               onChange={(e) => setFilter(e.target.value)}/>
                </SearchContainer>
                <UserCardContainer>
                    {filteredUsers.map((user) => (
                        <UserCard key={user.key} user={user} onToggleEnable={toggleEnable} />
                    ))}
                </UserCardContainer>
                </div>
                     :
                        <ResponsiveText scale={1} color={"#1f1e1e"}> Cargando... </ResponsiveText>}
            </CardWrapper>
    </>
}

const SearchContainer = styled.div`
  display: flex;
  justify-content: left;
  flex-direction: column;
  width: 50%;
  margin: 0 auto;
`;

const UserCardContainer = styled.div`
  margin: 0 auto; 
  overflow-y: auto;
  max-height: 300px;

  @media (max-width: 545px) {
    max-height: none;
  }
`;


const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 545px) {
    width: 65%;
    height: 75%;
    min-height: 300px;
    min-width: 200px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
    justify-content: center;
    align-items: center;
    position: absolute; 
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const UserCard = ({ user, onToggleEnable }) => {
    const { name, surname, username, role } = user;

    const backgroundColor = role === 'active' ? '#CFF0CF' : '#FFCACA';

    return (
        <UserCardWrapper style={{ backgroundColor }}>
            <UserInfo>
                <InfoText scale={0.40}>{name} {surname}</InfoText>
                <InfoText scale={0.40}>{username}</InfoText>
            </UserInfo>
            <ToggleWrapper>
                <ToggleButton onClick={() => onToggleEnable(user)}>
                    {role === 'active' ? 'REVOCAR' : 'CONCEDER'}
                </ToggleButton>
            </ToggleWrapper>
        </UserCardWrapper>
    );
};

const InfoText = styled(ResponsiveText)`
  letter-spacing: 0.4px;
`;

const UserCardWrapper = styled.div`
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  margin: 10px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  min-width: 400px;

  @media (max-width: 370px){
    min-width: 100px;
  }
  @media (max-width: 430px) and (min-width: 370px){
    min-width: 300px;
  }
  @media (max-width: 545px) and (min-width: 430px){
    min-width: 350px;
  }
  
  @media (max-width: 650px) and (min-width: 545px){
      min-width: 250px;
  }
  
  @media (max-width: 830px) and (min-width: 650px){
    min-width: 300px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`;

const ToggleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;


const ToggleButton = styled.button`
  padding: 5px 10px;
  background-color: #5ca5f1;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;



export default AdminPanel;