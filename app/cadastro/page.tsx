"use client"

import { useState } from "react";
import { auth, db } from "../services/firebaseConnections";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import style from "./cadastro.module.css";


interface Register {
  nome: string;
  email: string;
  senha: string;
  rules: number;
}

const Register: React.FC = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        nome: nome,
        email: email,
        rules: 2 
      });
      setLoading(false);
      router.push("/")
    } catch (error) {
      alert("Erro ao registrar usuário:");
      console.error("Erro ao registrar usuário:", error);
    }
  };

  return (
    <div className={style.containerCenter}>
      <div className={style.login}>
        <div className={style.loginArea}></div>
        <form className={style.form} onSubmit={handleSubmit}>
          <h1>Nova Conta</h1>
          <input
            type="text"
            placeholder="Nome de usuário"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            minLength={8}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
           <button type="submit" value="Acessar" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>
        <Link href="/">Já possui uma conta? Faça login</Link>
      </div>
    </div>
  );
};

export default Register;
