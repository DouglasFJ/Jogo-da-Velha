const jogadores = ['<img src="images/X.svg" alt="X">', '<img src="images/O.svg" alt="bolinha">']

function on_load() {
    let ativar_jogador = document.getElementById('jogador')
    ativar_jogador.innerHTML = jogadores[0]
}

function desligar_jogo(){
    let botoes = document.getElementsByClassName('btn')
    for (let i=0; i<9; i++){
        botoes[i].onclick = null
    }
}

function btn_click(id) {
    let txt_resultado = document.getElementById('txt_vencedor')
    let jogador_ativo = document.getElementById('jogador')
    let btn_clicked = document.getElementById(`btn_${id}`)
    let resultado = document.getElementById('vencedor')

    if (btn_clicked.innerHTML === ''){
        btn_clicked.innerHTML = jogador_ativo.innerHTML

        if (jogador_ativo.innerHTML === jogadores[0]) {
            jogador_ativo.innerHTML = jogadores[1]
        } else {
            jogador_ativo.innerHTML = jogadores[0]
        }
    }
    let resposta = verificar_vencedor()
    if (resposta.resultado === true){
        if (resposta.vencedor === 1){
            resposta.vencedor = jogadores[0]
        } else {
            resposta.vencedor = jogadores[1]
        }
        resultado.innerHTML = resposta.vencedor
        
        txt_resultado.style.display = 'block'
        desligar_jogo()
    } else if (resposta.resultado === false){
        txt_resultado.style.display = 'block'
        txt_resultado.innerHTML = 'EMPATE'
        desligar_jogo()
    }
}

function verificar_vencedor() {
    let resposta = {
        resultado: undefined,
        vencedor: undefined 
    }
    let matriz = []
    for (let i=1; i < 10; i++) {
        matriz[i-1] = document.getElementById((`btn_${i}`)).innerHTML
        if (matriz[i-1] === jogadores[0]) {
            matriz[i-1] = 1
        } else if (matriz[i-1] === jogadores[1]){
            matriz[i-1] = 2
        } else {
            matriz[i-1] = 0
        }
    }

    for (let i=0; i<8 ; i = i+3) {
        if (matriz[i] === matriz[i+1] && matriz[i] === matriz[i+2] && matriz[i] !== 0){
            resposta.resultado = true
            resposta.vencedor = matriz[i]
            return resposta
        }
    }
    for (let i=0; i<3; i++) {
        if (matriz[i] === matriz[i+3] && matriz[i] === matriz[i+6] && matriz[i] !== 0){
            resposta.resultado = true
            resposta.vencedor = matriz[i]
            return resposta
        }
    }
    if (matriz[0] !== 0 && matriz[0] === matriz[4] && matriz[0] === matriz[8]){
        resposta.resultado = true
        resposta.vencedor = matriz[0]
        return resposta
    }else if (matriz[2] !== 0 && matriz[2] === matriz[4] && matriz[2] === matriz[6]){
        resposta.resultado = true
        resposta.vencedor = matriz[2]
        return resposta
    }
    
    for (var i=0, ver = false ; i<9; i++){
        if (matriz[i] === 0){
            ver = true
        }
    }
    if (ver === false){
        resposta.resultado = false
        resposta.vencedor = undefined
        return resposta
    }
}