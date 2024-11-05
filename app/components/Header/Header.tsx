"use client";

import { useEffect, useState } from "react";
import { auth, db } from "../../services/firebaseConnections"; 
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import style from "./header.module.css";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/logo.gif";
import { FiGlobe, FiUser, FiX } from "react-icons/fi";

const Header: React.FC = () => {
    const [user, setUser] = useState<{ nome: string; email: string; rules: number } | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const userDoc = await getDoc(doc(db, "users", currentUser.uid));
                if (userDoc.exists()) {
                    setUser(userDoc.data() as { nome: string; email: string; rules: number });
                }
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    async function handleLogout() {
        await signOut(auth);
    }

    return (
        <div className={style.sidebar}>
            <div>
                <Image src={Logo} alt="logo site" />
            </div>
            <Link href="/perfil">
                <FiUser color="#fff" size={25} />
                Perfil
            </Link>

            {user?.rules === 1 && (
                <Link href="/usuarios">
                    <FiGlobe color="#fff" size={24} />
                    Regras
                </Link>
            )}

            <span onClick={handleLogout} className={style.btnClosed}>
                <FiX color="#fff" size={25} />
                Sair
            </span>
        </div>
    );
};

export default Header;
