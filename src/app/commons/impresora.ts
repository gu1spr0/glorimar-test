import { OperacionTicket } from './operacion-ticket';

const C = {
    AccionWrite: "write",
    AccionCut: "cut",
    AccionCash: "cash",
    AccionCutPartial: "cutpartial",
    AccionAlign: "align",
    AccionFontSize: "fontsize",
    AccionFont: "font",
    AccionEmphasize: "emphasize",
    AccionFeed: "feed",
    AccionQr: "qr",
    AlineacionCentro: "center",
    AlineacionDerecha: "right",
    AlineacionIzquierda: "left",
    FuenteA: "A",
    FuenteB: "B",
    AccionBarcode128: "barcode128",
    AccionBarcode39: "barcode39",
    AccionBarcode93: "barcode93",
    AccionBarcodeEAN: "barcodeEAN",
    AccionBarcodeTwoOfFiveSinInterleaved: "barcodeTwoOfFive",
    AccionBarcodeTwoOfFiveInterleaved: "barcodeTwoOfFiveInterleaved",
    AccionBarcodeCodabar: "barcodeCodabar",
    AccionBarcodeUPCA: "barcodeUPCA",
    AccionBarcodeUPCE: "barcodeUPCE",
    Medida80: 80,
    Medida100: 100,
    Medida156: 156,
    Medida200: 200,
    Medida300: 300,
    Medida350: 350,
};

const URL_PLUGIN = "http://localhost:8000";

export class Impresora {
    ruta;
    operaciones;

    
    
    constructor(ruta) {
        if (!ruta) ruta = URL_PLUGIN;
        this.ruta = ruta;
        this.operaciones = [];
    }

    setImpresora(nombreImpresora, rutaImpresora) {
        const url = rutaImpresora ? rutaImpresora : URL_PLUGIN
        return fetch(url + "/impresora", {
                method: "PUT",
                body: JSON.stringify(nombreImpresora),
            })
            .then(r => r.json())
            .then(respuestaDecodificada => respuestaDecodificada === nombreImpresora);
    }

    getImpresora(rutaImpresora) {
        const url = rutaImpresora ? rutaImpresora : URL_PLUGIN
        return fetch(url + "/impresora")
            .then(r => r.json());
    }

    getImpresoras(rutaImpresora) {
        const url = rutaImpresora ? rutaImpresora : URL_PLUGIN
        return fetch(url + "/impresoras")
            .then(r => r.json());
    }

    cut() {
        this.operaciones.push(new OperacionTicket(C.AccionCut, ""));
    }

    cash() {
        this.operaciones.push(new OperacionTicket(C.AccionCash, ""));
    }

    cutPartial() {
        this.operaciones.push(new OperacionTicket(C.AccionCutPartial, ""));
    }

    setFontSize(a, b) {
        this.operaciones.push(new OperacionTicket(C.AccionFontSize, `${a},${b}`));
    }

    setFont(font) {
        if (font !== C.FuenteA && font !== C.FuenteB) throw Error("Fuente inv??lida");
        this.operaciones.push(new OperacionTicket(C.AccionFont, font));
    }
    setEmphasize(val) {
        if (isNaN(parseInt(val)) || parseInt(val) < 0) throw Error("Valor inv??lido");
        this.operaciones.push(new OperacionTicket(C.AccionEmphasize, val));
    }
    setAlign(align) {
        if (align !== C.AlineacionCentro && align !== C.AlineacionDerecha && align !== C.AlineacionIzquierda) {
            throw Error(`Alineaci??n ${align} inv??lida`);
        }
        this.operaciones.push(new OperacionTicket(C.AccionAlign, align));
    }

    write(text) {
        this.operaciones.push(new OperacionTicket(C.AccionWrite, text));
    }

    feed(n) {
        if (!parseInt(n) || parseInt(n) < 0) {
            throw Error("Valor para feed inv??lido");
        }
        this.operaciones.push(new OperacionTicket(C.AccionFeed, n));
    }

    end() {
        return fetch(this.ruta + "/imprimir", {
                method: "POST",
                body: JSON.stringify(this.operaciones),
            })
            .then(r => r.json());
    }

    imprimirEnImpresora(nombreImpresora) {
        const payload = {
            operaciones: this.operaciones,
            impresora: nombreImpresora,
        };
        return fetch(this.ruta + "/imprimir_en", {
                method: "POST",
                body: JSON.stringify(payload),
            })
            .then(r => r.json());
    }

    qr(contenido) {
        this.operaciones.push(new OperacionTicket(C.AccionQr, contenido));
    }

    validarMedida(medida) {
        medida = parseInt(medida);
        if (medida !== C.Medida80 &&
            medida !== C.Medida100 &&
            medida !== C.Medida156 &&
            medida !== C.Medida200 &&
            medida !== C.Medida300 &&
            medida !== C.Medida350) {
            throw Error("Valor para medida del barcode inv??lido");
        }
    }

    validarTipo(tipo) {
        if (
            [C.AccionBarcode128,
                C.AccionBarcode39,
                C.AccionBarcode93,
                C.AccionBarcodeEAN,
                C.AccionBarcodeTwoOfFiveInterleaved,
                C.AccionBarcodeTwoOfFiveSinInterleaved,
                C.AccionBarcodeCodabar,
                C.AccionBarcodeUPCA,
                C.AccionBarcodeUPCE,
            ]
            .indexOf(tipo) === -1
        ) throw Error("Tipo de c??digo de barras no soportado");
    }

    barcode(contenido, medida, tipo) {
        this.validarMedida(medida);
        this.validarTipo(tipo);
        let payload = contenido.concat(",").concat(medida.toString());
        this.operaciones.push(new OperacionTicket(tipo, payload));
    }

}