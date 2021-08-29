const fs = require("fs");
const axios = require("axios");
const client = require("../elephantsql");

class ApplicationsController{
    
    fileExists() {
        return fs.existsSync("../applications.js")
    };

    getApplications = (_, res) => {

        client.query('SELECT * FROM applications', function(err, result) {
            if(err) {
              return console.error('error running query', err);
            }
            if (result == []) return res.status(404).json ({"message": "Nenhum registro encontrado"});
            res.status(200).json(result.rows);
        });

        /* if (!this.fileExists()) return res.status(404).json ({"message": "Nenhuma registro encontrado"});
        fs.readFile("../applications.js", (error, data) => {
            if(error) throw error;
            res.status(200).json(JSON.parse(data));
        }); */
    };

    getCEP = (req, res) => {
        const cep = req.body.cep;
        axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => {
            const data = response.data
            const responseToSend = {
                cep: data.cep,
                logradouro: data.logradouro,
                bairro: data.bairro,
                localidade: data.localidade,
            };
            res.status(200).json(responseToSend)

        })
        .catch((error) => res.status(500).send(error))
    };

    setApplication = (req, res) => {
        console.log(req.body)
        const { cpf, nome, cargo, dataNascimento, estadoCivil, sexo, cep, logradouro, numero, complemento, bairro, cidade, telefone1, telefone2, celular, contato, email, identidade, possuiVeiculo, habilitacao } = req.body;

        if (cpf == "" || nome == "" || dataNascimento == "" || cep == "" || logradouro == "" || numero == "" || bairro == "" || cidade == "" || email == "" || cargo == "" || celular == "") return res.status(406).json ({"message": "Os campos CPF, Nome, Data de Nascimento, Cep, Logradouro, Numero, Bairro, Cidade, Email, Cargo e Celular são obrigatórios"});

        const application = {
            nome, cargo, dataNascimento, estadoCivil, sexo, endereco: `${cep} ${logradouro} ${numero} ${complemento} ${bairro} ${cidade}`, telefone1, telefone2, celular, contato, email, identidade, cpf, possuiVeiculo,habilitacao
        };

        client.query(`INSERT INTO applications(nome, cargo, dataNascimento, estadoCivil, sexo, endereco, telefone1, telefone2, celular, contato, email, identidade, cpf, possuiVeiculo, habilitacao) VALUES ('${application.nome}', '${application.cargo}', '${application.dataNascimento}', '${application.estadoCivil}', '${application.sexo}', '${application.endereco}', '${application.telefone1}', '${application.telefone2}', '${application.celular}', '${application.contato}', '${application.email}', '${application.identidade}', '${application.cpf}', '${application.possuiVeiculo}', '${application.habilitacao}')`, function(err, result) {
            if(err) {
                if(err.detail.includes(`Key (cpf)=(${application.cpf}) already exists`)) return res.status(409).json({"message": "Usuário já cadastrado"});
                return console.error('error running query', err.detail);
            }
            res.status(201).json({"message": "Registro criado com sucesso"});
          });

        /* if(!this.fileExists()){
            fs.writeFileSync("../applications.js", JSON.stringify([application]));
            res.status(201).json({"message": "Registro criado com sucesso"});
            return;
        }

        fs.readFile("../applications.js", (error, data) => {
            if(error) throw error;

            const applicationsData = JSON.parse(data);
            const applicationExists = applicationsData.filter((submitted) => {
                return submitted.cpf == application.cpf
            });
            
            if (applicationExists.length) return res.status(409).json({"message": "Usuário já cadastrado"});

            applicationsData.push(application);
            fs.writeFileSync("../applications.js", JSON.stringify(applicationsData));
            res.status(201).json({"message": "Registro criado com sucesso"});
        }); */
    }
}

module.exports =  new ApplicationsController();
