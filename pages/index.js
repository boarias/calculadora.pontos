import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [empresa, setEmpresa] = useState("Livelo");
  const [companhia, setCompanhia] = useState("Azul");
  const [enviado, setEnviado] = useState(0);
  const [bonus, setBonus] = useState(0);
  const [limiteBonus, setLimiteBonus] = useState(0);
  const [valorPago, setValorPago] = useState(0);
  const [resultado, setResultado] = useState(null);

  const calcular = () => {
    const pontosBonus = enviado * (bonus / 100);
    const pontosRecebidos = enviado + pontosBonus;
    const maxEnvio = bonus > 0 ? limiteBonus / (bonus / 100) : 0;
    const valorPorMil = pontosRecebidos > 0 ? (valorPago / pontosRecebidos) * 1000 : 0;

    setResultado({
      pontosRecebidos,
      maxEnvio,
      valorPorMil
    });
  };

  const formatarNumero = (n) => n.toLocaleString('pt-BR', {
    minimumFractionDigits: 2, maximumFractionDigits: 2,
  });

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', background: '#f2f4f8', minHeight: '100vh', padding: '1rem' }}>
      <div style={{
        maxWidth: 400,
        margin: 'auto',
        background: '#fff',
        borderRadius: '1.5rem',
        overflow: 'hidden',
        boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
      }}>
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <Image src='/logo.jpg' alt='Logo' width={120} height={120} />
        </div>
        <div style={{ background: '#1d3557', padding: '1.2rem', textAlign: 'center' }}>
          <h1 style={{ color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}>
            Calculadora de Transferência de Pontos
          </h1>
        </div>
        <div style={{ padding: '1.5rem' }}>
          <label>Empresa</label>
          <select value={empresa} onChange={(e) => setEmpresa(e.target.value)} style={selectStyle}>
            <option>Livelo</option>
            <option>Esfera</option>
            <option>Coopera</option>
            <option>C6</option>
            <option>Loop</option>
            <option>Itaú</option>
            <option>Sicredi</option>
          </select>

          <label>Companhia aérea</label>
          <select value={companhia} onChange={(e) => setCompanhia(e.target.value)} style={selectStyle}>
            <option>Azul</option>
            <option>LATAM</option>
            <option>Smiles</option>
            <option>TAP</option>
            <option>Iberia</option>
          </select>

          <label>Pontos enviados</label>
          <input type="number" value={enviado} onChange={(e) => setEnviado(Number(e.target.value))} style={inputStyle} />

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <div style={{ flex: 1 }}>
              <label>Bônus (%)</label>
              <input type="number" value={bonus} onChange={(e) => setBonus(Number(e.target.value))} style={inputStyle} />
            </div>
            <div style={{ flex: 1 }}>
              <label>Limite de bônus</label>
              <input type="number" value={limiteBonus} onChange={(e) => setLimiteBonus(Number(e.target.value))} style={inputStyle} />
            </div>
          </div>

          <label>Valor total pago (R$)</label>
          <input type="number" value={valorPago} onChange={(e) => setValorPago(Number(e.target.value))} style={inputStyle} step="0.01" />

          <button onClick={calcular} style={{
            width: '100%',
            marginTop: '1rem',
            backgroundColor: '#1d3557',
            color: '#fff',
            padding: '0.7rem',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold'
          }}>
            Calcular
          </button>

          {resultado && (
            <div style={{ marginTop: '1.5rem' }}>
              <p><strong>Pontos recebidos com bônus:</strong> {formatarNumero(resultado.pontosRecebidos)}</p>
              <p><strong>Limite máximo de envio:</strong> {formatarNumero(resultado.maxEnvio)}</p>
              <p><strong>Valor por 1.000 pontos recebidos:</strong> R$ {formatarNumero(resultado.valorPorMil)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '0.5rem',
  marginBottom: '0.8rem',
  borderRadius: '8px',
  border: '1px solid #ccc'
};

const selectStyle = {
  width: '100%',
  padding: '0.5rem',
  marginBottom: '0.8rem',
  borderRadius: '8px',
  border: '1px solid #ccc'
};