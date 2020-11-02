import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState, createRef } from "react";
import { alfabeto } from "./Alfabeto";
function App() {
  const alf = alfabeto;
  const [textmuted, setTextmuted] = useState(
    "Ingrese texto a cifrar o descrifrar"
  );
  const [form, setForm] = useState({
    textoplano: "",
    c1: "",
    c2: "",
    secuencia: "",
  });
  const [textoEncriptadoFinal, setTextoEncriptadoFinal] = useState("");
  const [textoDesencriptadoFinal, setTextoDesencriptadoFinal] = useState("");
  const [historial, setHistorial] = useState([]);
  const bottomRefDiv = createRef();

  //@ARGS text:String, toReplace:Char, replaceWith:Char
  //@RETURNS un texto convertido todo a mayusculas y reemplazando una letra por otra
  //segun los parametros
  const replaceFromText = (text = " ", toReplace = " ", replaceWith = " ") => {
    return text.toUpperCase().replaceAll(toReplace, replaceWith);
  };

  //@ARGS textToEncode:String, secuence:String
  //@RETURNS retorna la secuencia entregada como parametro pero en un array y
  // repetida X veces de tal manera que sea de igual o mayor tamaño que la palabra
  //a codificar
  const modifySecuenceToMatchTextSize = (textToEncode = " ", secuence = "") => {
    if (textToEncode.length <= secuence.split(",").length) {
      return secuence.split(",");
    } else {
      let repeticiones = Math.trunc(
        textToEncode.length / secuence.split(",").length
      );
      return (secuence + ",").repeat(repeticiones + 1).split(",");
    }
  };

  //@ARGS secuenceArray:Array, k1:Number, k2:Number
  //@RETURNS Retorna el mismo array entregado como parametro, pero con cada elemento
  // de la secuencia cambiado por su respectivo K
  //@EXAMPLE C1=2,C2=3  secuenceArray=[c1,c2,c2,c1,c2,c2,c1]
  // returns => [2,3,3,2,3,3,2]
  const transformSecuenceToKValues = (secuenceArray, k1, k2) => {
    //console.log(secuenceArray, "\nk1:", k1, "\nk2:", k2);
    return secuenceArray.map((sec) => {
      if (sec === "c1") {
        return Number(k1);
      } else {
        return Number(k2);
      }
    });
  };

  //@ARGS textToEncode:String, secuenceArray:Array
  //@RETURNS retorna el texto codificado segun el alfabeto español
  // y segun los corrimientos del array secuenceArray
  const createEncodedText = (textToEncode, secuenceArray) => {
    let indexOf;
    let auxVal;
    let finalText = "";
    for (let i = 0; i < textToEncode.length; i++) {
      indexOf = alf.indexOf(textToEncode[i]);
      if (indexOf + secuenceArray[i] < alf.length) {
        auxVal = alf[indexOf + secuenceArray[i]];
        finalText = finalText + auxVal;
      } else {
        auxVal = alf[indexOf + secuenceArray[i] - alf.length];
        finalText = finalText + auxVal;
      }
    }
    return finalText;
  };
  //@ARGS textToEncode:String, secuenceArray:Array
  //@RETURNS retorna el texto decodificado segun el alfabeto español
  // y segun los corrimientos inversos del array secuenceArray
  const createDecodedText = (textToDecode, secuenceArray) => {
    let indexOf;
    let auxVal;
    let finalText = "";
    for (let i = 0; i < textToDecode.length; i++) {
      indexOf = alf.indexOf(textToDecode[i]);
      if (indexOf - secuenceArray[i] < 0) {
        auxVal = alf[alf.length - Math.abs(indexOf - secuenceArray[i])];
        finalText = finalText + auxVal;
      } else {
        auxVal = alf[indexOf - secuenceArray[i]];
        finalText = finalText + auxVal;
      }
    }
    return finalText;
  };

  //@ARGS
  //@RETURNS retorna el texto a codificar o decodificar pero formateado, es decir, en mayusculas y con "X" en lugar
  // de espacios, ademas de generar el secuenceArray necesario para codificar o decodificar el mensaje
  const preFormatVariables = () => {
    let textToEncode = replaceFromText(form.textoplano, " ", "X");
    let secuenceArray = modifySecuenceToMatchTextSize(
      textToEncode,
      form.secuencia
    );
    secuenceArray = transformSecuenceToKValues(secuenceArray, form.c1, form.c2);
    return [textToEncode, secuenceArray];
  };

  //@ARGS
  //@RETURNS Cifra el mensaje y agrega el resultado a el historial
  const cifrar = () => {
    let [textToEncode, secuenceArray] = preFormatVariables();
    let encodedText = createEncodedText(textToEncode, secuenceArray);
    setTextoEncriptadoFinal(encodedText);
    addToHistory(
      form.textoplano,
      form.c1,
      form.c2,
      form.secuencia,
      encodedText,
      "cifrado"
    );
    bottomRefDiv.current.scrollIntoView({ behavior: "smooth" });
  };
  //@ARGS
  //@RETURNS Descifra el mensaje y agrega el resultado a el historial
  const descrifrar = () => {
    let [textToEncode, secuenceArray] = preFormatVariables();
    let decodedText = createDecodedText(textToEncode, secuenceArray);
    setTextoDesencriptadoFinal(decodedText);
    addToHistory(
      form.textoplano,
      form.c1,
      form.c2,
      form.secuencia,
      decodedText,
      "descifrado"
    );
    bottomRefDiv.current.scrollIntoView({ behavior: "smooth" });
  };

  //@ARGS
  //@RETURNS Agrega eventos de cod y decod al historial
  const addToHistory = (text, c1, c2, secuence, editedText, type) => {
    let aux = historial;
    aux.push({
      tipo: type,
      texto: text,
      c1: c1,
      c2: c2,
      secuence: secuence,
      editedText: editedText,
    });
    setHistorial(aux);
  };

  const handleChange = (e) => {
    let aux = form;
    e.target.value = e.target.value.toUpperCase();
    form[e.target.id] = e.target.value;
    setForm(aux);
    console.log(e.target.value);
  };

  const onSubmit = (action) => {
    if (form.textoplano.includes("X") && action === "en") {
      alert("El texto a encriptar no puede tener X");
      return false;
    }
    if (form.secuencia.length < 5 || form.secuencia.length > 17) {
      alert("Las secuencias deben tener entre 2 y 6 elementos");
    } else if (form.c1 < 2 || form.c1 > 26 || form.c2 < 2 || form.c2 > 26) {
      alert("c1 y c2 deben estar entre 2 y 26");
    } else {
      if (action === "en") {
        cifrar();
      } else {
        descrifrar();
      }
    }
  };
  useEffect(() => {
    console.log(alfabeto);
    return () => {};
  }, []);
  return (
    <div className="App" style={{ margin: "2%" }}>
      <Container fluid>
        <Row style={{ margin: "10%" }}>
          <Col xs="2"></Col>
          <Col xs="8">
            <h2>Taller 2 Gestion de seguridad: Cifrado polialfabetico</h2>
          </Col>
          <Col xs="2"></Col>
        </Row>

        <Row>
          <Col xs>
            <p>Historial</p>
            <div style={{ maxHeight: "500px", overflowX: "auto" }}>
              {historial.map((evento) => (
                <Card
                  bg={evento.tipo === "cifrado" ? "secondary" : "primary"}
                  text={"white"}
                  style={{ width: "18rem" }}
                  className="mb-2"
                >
                  <Card.Header>
                    <b>{evento.tipo}</b>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title> Texo: {evento.texto} </Card.Title>
                    <Card.Text>
                      <p>
                        c1:{evento.c1}, c2:{evento.c2}
                      </p>
                      <p>secuencia: {evento.secuence}</p>
                      <p>resultado: {evento.editedText}</p>
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))}
              <div ref={bottomRefDiv}></div>
            </div>
          </Col>
          <Col xs>
            <Form>
              <Form.Group>
                <Form.Label>texto</Form.Label>
                <Form.Control
                  id="textoplano"
                  type="text"
                  placeholder="textoplano"
                  onChange={handleChange}
                />
                <Form.Text className="text-muted">{textmuted}</Form.Text>
              </Form.Group>
              <Row>
                <Col>
                  {" "}
                  <Form.Group>
                    <Form.Label>C1</Form.Label>
                    <Form.Control
                      id="c1"
                      min="2"
                      max="26"
                      type="number"
                      placeholder="k="
                      onChange={handleChange}
                    />
                    <Form.Text className="text-muted">corrimiento</Form.Text>
                  </Form.Group>
                </Col>
                <Col>
                  {" "}
                  <Form.Group>
                    <Form.Label>C2</Form.Label>
                    <Form.Control
                      id="c2"
                      type="number"
                      placeholder="k="
                      min="2"
                      max="26"
                      onChange={handleChange}
                    />
                    <Form.Text className="text-muted">corrimiento</Form.Text>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group>
                <Form.Label>Secuencia</Form.Label>
                <Form.Control
                  id="secuencia"
                  type="text"
                  placeholder="secuencia"
                  onChange={handleChange}
                />
                <Form.Text className="text-muted">ej:c1,c2,c2</Form.Text>
              </Form.Group>
              <Button
                variant="primary"
                onClick={() => {
                  onSubmit("en");
                }}
              >
                Encriptar
              </Button>
              <Button
                style={{ marginLeft: "4%" }}
                variant="primary"
                onClick={() => {
                  onSubmit("des");
                }}
              >
                Desencriptar
              </Button>
            </Form>
          </Col>
          <Col xs>
            Resultado encriptado:<p>{textoEncriptadoFinal}</p>
          </Col>
          <Col xs>
            Resultado descifrado <p>{textoDesencriptadoFinal}</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
