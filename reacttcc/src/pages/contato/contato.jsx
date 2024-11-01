import './contato.scss'; 
import Cabecalho from '../../components/cabecalho/cabecalho.jsx';
import Rodape from '../../components/rodape/rodape.jsx';
import { useState, useEffect, useRef } from 'react';

function Contato() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [descricao, setDescricao] = useState('');
  const [politica, setPolitica] = useState(false);

  const inputFileRef = useRef(null);
  const pictureImageRef = useRef(null);
  const pictureImageTxt = "Buscar imagem no dispositivo";

  useEffect(() => {
    pictureImageRef.current.innerHTML = pictureImageTxt;

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = document.createElement("img");
          img.src = event.target.result;
          img.classList.add("picture__img");

          pictureImageRef.current.innerHTML = "";
          pictureImageRef.current.appendChild(img);
        };
        reader.readAsDataURL(file);
      } else {
        pictureImageRef.current.innerHTML = pictureImageTxt;
      }
    };

    const inputFile = inputFileRef.current;
    inputFile.addEventListener("change", handleFileChange);

    return () => {
      inputFile.removeEventListener("change", handleFileChange);
    };
  }, []);

  const handleDownload = () => {
    const pdfUrl = './documents/Política de Privacidade Front Company.pdf';
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.setAttribute('download', 'Política de Privacidade Front Company.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const VerificacaoCep = () =>{
    if(cep.length == 8){
      alert('CEP Valido!');
    }
    else{
      alert('CEP Inválido!');
    }
  }

  return (
    <div className="pagina-contato">
      <header className="cabecalho">
        <Cabecalho />
      </header>

      <img className='contatobanner' src="./images/contatobanner.png" alt="" />

      <h1>Deixe sua mensagem</h1>

      <div className='interativo'>
        <div className='cima'>
          <div className='campos'>
            <input placeholder='Nome' type="text" value={nome} onChange={e => setNome(e.target.value)} />
            <input placeholder='E-Mail' type="email" value={email} onChange={e => setEmail(e.target.value)} />
            <input placeholder='Tel. ex.: (__) _ ____-____' type="number" value={telefone} onChange={e => setTelefone(e.target.value)} />
            <input placeholder='CEP: _____-___' type="number" value={cep} onChange={e => setCep(e.target.value)} />
          </div>

          <div className='imagem'>
            <label className="picture" htmlFor="picture__input" tabIndex="0">
              <span className="picture__image" ref={pictureImageRef}></span>
            </label>
            <input type="file" name="picture__input" id="picture__input" ref={inputFileRef} />
          </div>
        </div>

        <div className='mensagem'>
          <textarea placeholder='Insira aqui sua mensagem' type="text" value={descricao} onChange={e => setDescricao(e.target.value)} />
        </div>

        <div className='politica'>
          <div className='escrita'>
            <p>Declaro que li e estou de acordo com a </p>
            <a href="" onClick={handleDownload}> Política de Privacidade </a>
            <p>da Maria Flor.</p>
          </div>
          <input type="checkbox" checked={politica} onChange={() => setPolitica(!politica)} />
        </div>

        <button>Enviar</button>
      </div>

      <Rodape />
    </div>
  );
}

export default Contato;
