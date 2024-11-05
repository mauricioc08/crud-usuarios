"use client";

import style from "../perfil/perfil.module.css";
import { FiGlobe, FiX, FiEdit } from "react-icons/fi"; 
import Header from "../components/Header/Header";
import RouteGuard from "../components/RouteGuard/RouteGuard";
import { db } from "../services/firebaseConnections";
import { collection, doc, onSnapshot, deleteDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

interface UserType {
  id: string; 
  nome: string;
  email: string;
  rules: number;
  created?: Date; 
}

const Usuarios: React.FC = () => {
  const [users, setUsers] = useState<UserType[]>([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = () => {
      const listRef = collection(db, "users");

      return onSnapshot(listRef, (snapshot) => {
        const userList: UserType[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          userList.push({ ...data, id: doc.id } as UserType); 
        });
        setUsers(userList);
        setLoading(false);
      });
    };

    loadUsers();
  }, []);

  async function deleteUser(userId: string) {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      try {
        await deleteDoc(doc(db, "users", userId));
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      } catch (error) {
        console.log("Erro ao excluir o usuário:", error);
      }
    }
  }

  async function updateUserRules(userId: string, newRules: number) {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { rules: newRules });
      alert("Nível de acesso atualizado com sucesso!");
    } catch (error) {
      console.log("Erro ao atualizar o nível de acesso:", error);
    }
  }

  if (loading) {
    return (
      <RouteGuard>
        <div>
          <Header />
          <div className={style.content}>
            <div className={style.title}>
              <span>Usuários</span>
              <FiGlobe size={25} />
            </div>
            <div className={style.container}>
              <span>Carregando usuários...</span>
            </div>
          </div>
        </div>
      </RouteGuard>
    );
  }

  return (
    <RouteGuard>
      <div>
        <Header />
        <div className={style.content}>
          <div className={style.title}>
            <span>Usuários</span>
            <FiGlobe size={25} />
          </div>
          <table>
            <thead>
              <tr>
                <th scope="col">Usuário</th>
                <th scope="col">Email</th>
                <th scope="col">Nível de Acesso</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item, index) => (
                <tr key={index}>
                  <td data-label="Usuário">{item.nome}</td>
                  <td data-label="Email">{item.email}</td>
                  <td data-label="Nível de Acesso">
                    <span
                      className={style.badge}
                      style={{
                        backgroundColor:
                          item.rules === 1 ? "rgb(102, 102, 236)" : "rgb(192, 212, 7)",
                      }}
                    >
                      {item.rules === 1 ? "Admin" : "Usuário"}
                    </span>
                  </td>
                  <td data-label="Ações">
                    <button
                      onClick={() => deleteUser(item.id)} 
                      className={style.action}
                      style={{ backgroundColor: "rgba(247, 3, 3, 0.856)" }}
                      title="Excluir Usuário"
                    >
                      <FiX size={25} color="#fff" />
                    </button>
                    <button
                      onClick={() => updateUserRules(item.id, item.rules === 1 ? 0 : 1)} // Alternar entre Admin e Usuário
                      className={style.action}
                      style={{ backgroundColor: "rgba(3, 147, 247, 0.856)", marginLeft: "5px" }} // Estilo para o botão
                      title="Atualizar Nível de Acesso"
                    >
                      <FiEdit size={25} color="#fff" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </RouteGuard>
  );
};

export default Usuarios;
