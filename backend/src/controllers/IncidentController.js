const connection = require('../database/connection');

module.exports = {
    async index(request,response){
        const{page = 1} = request.query;

        const [count] = await connection('incidents').count();
        
        const incidents = await connection('incidents')
         .join('ongs', 'ongs.id', '=','incidents.ong_id')
         .limit(5)
         .offset((page - 1) * 5)
         .select(['incidents.*', 'ongs.name',
          'ongs.email','ongs.whatsapp',
          'ongs.city', 'ongs.uf']);

        //normal que o total volte no cabeçalho da resposta
        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },




    async create(request, response){
        const{tittle,description,value} = request.body;
        const ong_id = request.headers.authorization;
        //Como vou precisar do ID da ong, id autenticado
        //essa informação não é bom passar no body, mas sim no cabeçalho
        //pois nele ficam as info do contexto da req
        //vao dados da autenticação do user/ da localização/idioma/
        //tipo a hash de auth do proj nat


        const [id] = await connection('incidents').insert({
          tittle,
          description,
          value,
          ong_id,  
        });
        return response.json({id});
    },

    async delete(request,response){
        const {id} = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id',id)
            .select('ong_id')
            .first();

        if(!incident){
            return response.status(400).json({error:'No incident found with this ID'}); 
        }    

        if(incident.ong_id !== ong_id){
            return response.status(401).json({erro: 'Operation not permitted.'});
        } 
        await connection('incidents').where('id',id).delete();

        return response.status(204).send();
        //resta de sucesso sem conteudo a ser mostrado
    }




};