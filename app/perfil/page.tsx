"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { doc, updateDoc, getDoc } from "firebase/firestore"; // Importar getDoc
import { auth, db } from "../services/firebaseConnections";
import { FiSettings } from "react-icons/fi";
import Header from "../components/Header/Header";
import style from "./perfil.module.css";
import RouteGuard from "../components/RouteGuard/RouteGuard";

const Perfil: React.FC = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setNome(userData.nome);
          setEmail(userData.email);
        }
      } else {
        router.push("/"); 
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    

    if (!auth.currentUser) return;

    try {
      
      const credential = EmailAuthProvider.credential(auth.currentUser.email || "", currentPassword);
      await reauthenticateWithCredential(auth.currentUser, credential);

      const userRef = doc(db, "users", auth.currentUser.uid);

      
      await updateDoc(userRef, {
        nome,
      });

      
      if (newPassword) {
        await updatePassword(auth.currentUser, newPassword);
      }

      
      setNome("");
      setNewPassword("");
      setCurrentPassword("");
      alert("Dados atualizados com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar dados:", error);
      alert("Erro ao atualizar dados. Tente novamente.");
    }
  };

  return (
    <RouteGuard>
      <div>
        <Header />
        
        <div className={style.content}>
          <div className={style.title}>
              <span>Meu Perfil</span>
              <FiSettings size={25} />
          </div>

          <div className={style.container}>
            <form className={style.formProfile} onSubmit={handleSubmit}>
              <label>Nome de Usuário</label>
              <input 
                type="text" 
                value={nome} 
                onChange={(e) => setNome(e.target.value)} 
                required 
              />

              <label>Email</label>
              <input 
                type="email" 
                value={email} 
                disabled={true} 
              />

              <label>Senha Atual</label>
              <input 
                type="password" 
                value={currentPassword} 
                onChange={(e) => setCurrentPassword(e.target.value)} 
                required 
              />

              <label>Nova Senha</label>
              <input 
                type="password" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
              />

              <button type="submit">Atualizar Dados</button>
            </form>

            
          </div>
        </div>
      </div>
    </RouteGuard>
  );
};

export default Perfil;
