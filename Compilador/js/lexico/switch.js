switch (linha[index]) {

    case (linha[index] == " " || linha[index] == "\t"):
        //caso seja espaco ou \t, sai
        break;

    case (comentario == true):
        console.log("encerra");
        if (linha[index] == "}") {
            //final de comentario 1
            comentario = false;
        }
        if (linha[index] == "*" && linha[index + 1] == "/") {
            //TALVEZ AQUI: index atualiza pois ja validou a posicao seguinte
            index = index + 1;
            //final de comentario 2
            comentario = false;
        }
        break;

    case (linha[index] == "{"):
        //inicio de comentario 1
        comentario = true;
        break;

    case (linha[index] == "/" && linha[index + 1] == "*"):
        //inicio de comentario 2
        comentario = true;
        //TALVEZ AQUI: index atualiza pois ja validou a posicao seguinte
        index = index + 1;
        break;



    default: console.log("default")
        break;
}