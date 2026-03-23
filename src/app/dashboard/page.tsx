"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function DashboardPage() {
    const [registrations, setRegistrations] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem('registrations');
        if (stored) {
            setRegistrations(JSON.parse(stored));
        }
    }, []);

    return (
        <main className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-6">Dashboard Pendaftaran</h1>
                <div className="space-y-4">
                    {registrations.length === 0 ? (
                        <p>Belum ada pendaftaran</p>
                    ) : (
                        registrations.map((reg, i) => (
                            <div key={reg.id} className="bg-white p-4 rounded-xl shadow">
                                <p><strong>{i + 1}. {reg.fullName}</strong> - {reg.serviceName}</p>
                                <p className="text-sm text-slate-500">{reg.preferredDate} ({reg.preferredTime})</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </main>
    );
}