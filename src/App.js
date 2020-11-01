import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
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

  //funcion que retorna el texto original en minusculas y reemplazar
  //algun caracter por otro
  const replaceFromText = (text = " ", toReplace = " ", replaceWith = " ") => {
    return text.toLowerCase().replaceAll(toReplace, replaceWith);
  };

  //funcion que retorna la secuencia original pero de un largo igual o mayor
  //al texto que se va a encriptar
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

  const preFormatVariables = () => {
    let textToEncode = replaceFromText(form.textoplano, " ", "x");
    let secuenceArray = modifySecuenceToMatchTextSize(
      textToEncode,
      form.secuencia
    );
    secuenceArray = transformSecuenceToKValues(secuenceArray, form.c1, form.c2);
    return [textToEncode, secuenceArray];
  };
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
    form[e.target.id] = e.target.value;
    setForm(aux);
    console.log(aux);
  };

  const onSubmit = (action) => {
    if (action == "en") {
      cifrar();
    } else {
      descrifrar();
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
                  text={"light" === "light" ? "white" : "white"}
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
                      type="text"
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
                      type="text"
                      placeholder="k="
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
