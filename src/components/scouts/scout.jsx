import React from 'react';
import '../css/time.css';

export default function Scouts(props) {
    // const [pontos, setPontos] = useState(null);
    // const [corPontos, setCorPontos] = useState(null);

    function parOuImpar(numero) {
        return (numero % 2 === 0 ? "p" : "i");
    }
    function pontosScout(sigla, quantidade) {
        const scoutsValores = {
            "CA": -2,
            "CV": -5,
            "RB": 1.5,
            "A": 5,
            "FT": 3,
            "FD": 1.2,
            "FF": 0.8,
            "PP": -4,
            "I": -0.5,
            "PE": -0.3,
            "SG": 5,
            "DP": 7,
            "DD": 3,
            "GC": -5,
            "GS": -2,
            "FC": -0.5,
            "FS": 0.5,
            "G": 8
        }
        const pontos = parseFloat((quantidade * scoutsValores[sigla]).toFixed((1)));
        return pontos;
    }
    function corPontos(pontos, total) {
        if(total){
            return pontos > 0 ? "verde" : "vermelho";
        }else{
            if (pontos < 0) {
                return "vermelho"
            } else if (pontos > 3 && pontos <= 5) {
                return "amarelo";
            } else if (pontos > 5 && pontos <= 8) {
                return "laranja";
            } else if (pontos > 8) {
                return "tomato";
            }
        }

        return "bold";
    }

    function nomeScout(sigla) {
        switch (sigla) {
            case "CA":
                return "Cartões Amarelos"
            case "CV":
                return "Cartões Vermelhos"
            case "RB":
                return "Roubadas de Bola"
            case "A":
                return "Assistências"
            case "FT":
                return "Final. na Trave"
            case "FD":
                return "Final. Defendidas"
            case "FF":
                return "Final. para Fora"
            case "PP":
                return "Penâltis Perdidos"
            case "PE":
                return "Passe Errado"
            case "SG":
                return "Saldo de Gols"
            case "DP":
                return "Defesa de Pênaltis"
            case "DD":
                return "Defesas Difíceis"
            case "GC":
                return "Gols Contras"
            case "GS":
                return "Gols Sofridos"
            case "FC":
                return "Faltas Cometidas"
            case "FS":
                return "Faltas Sofridas"
            case "G":
                return "Gols"
            case "I":
                return "Impedimento"
            default:
                break;
        }
        return sigla;
    }
    return (
        // {scouts}
        <div className="menu-container">
            <div className="menu-header">
                <h2>{props.nomeJogador}</h2>
            </div>

            <div className="menu-content">
                <div className={"option-" + parOuImpar(1)}>
                    <div className="quantidade-scout">{""}</div>
                    <div className="nome-scout">Posição</div>
                    <div className={"pontos-scout"}>
                        <div className={"pos-" + props.pos}>{props.pos}</div>
                    </div>
                </div>
                {props.scout && Object.keys(props.scout).map((scout, index) => (
                    <React.Fragment key={index}>
                        <div key={index} className={"option-" + parOuImpar(index)}>
                            <div className="quantidade-scout">{props.scout[scout]}</div>
                            <div className="nome-scout">{nomeScout(scout)}</div>
                            <div className={"pontos-scout " + corPontos(pontosScout(scout, props.scout[scout]), false)}>{pontosScout(scout, props.scout[scout])}</div>
                        </div>
                    </React.Fragment>

                ))}
                <div className={"option-" + parOuImpar(1)}>
                    <div className="quantidade-scout">{""}</div>
                    <div className="nome-scout">Total</div>
                    <div className={"pontos-scout " + corPontos(props.pontuacao, true)}>{props.pontuacao}</div>
                </div>
                <div className="info-jogadores">
                    <div className="container-info-jogadores">
                        <div className="foto-jogador">
                            <img src={props.fotoJogador.replace("FORMATO", "80x80")} alt="foto-jogador" />
                        </div>
                        <div className="escudo-clube">
                            <img src={props.escudoClubeJogador} alt="escudo-clube" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}