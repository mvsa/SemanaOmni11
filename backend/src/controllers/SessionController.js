const connection = require('../database/connection');



module.exports = {
    async create(request,respose){
        const {id} = request.body;

        const ong = await connection('ongs')
        .where('id',id)
        .select('name')
        .first();

        //como vai retornar apenas um registro (pesquisa por id)
        //.first me retorna apenas 1 e não um array

        if(!ong){
           return respose.status(400).json({error:'No ong found with this ID'}); 
        }
        return respose.json(ong);
    }
}