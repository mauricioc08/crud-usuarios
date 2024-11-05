"use client"

import Link from "next/link";
import style from "../app/cadastro/cadastro.module.css";
import Image from "next/image";
import logoImg from "../public/logo.gif";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./services/firebaseConnections";
import { useRouter } from "next/navigation";


export default function Home() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/perfil");
    } catch (error) {
      alert("Você Não Tem Cadastro ou Email e Senha Estão Incorretos");
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <div className={style.containerCenter}>
      <div className={style.login}>
        <div className={style.loginArea}>
        <Image src={logoImg} alt="Logo do site" />
        </div>

        <form className={style.form} onSubmit={handleLogin}>
          <h1>Entrar</h1>
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
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" value="Acessar">
          {loading ? "Carregando..." : "Entrar"}
          </button>
        </form>

        <Link href="/cadastro">Criar uma Conta</Link>
      </div>
    </div>
  );
}
