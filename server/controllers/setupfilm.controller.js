const setupFilmServices = require("../service/setupfilm.services")

const setupFilmController = {
    getDayShowFilm: async (req, res) => {
        let now1 = new Date();
        const now = now1.toISOString().split('T')[0].split('-').join('');
        console.log(now)
        const {id} = req.params
        try {
            const result = await setupFilmServices.getDayShowFilm(id)
            let date = result[0][0].releaseDate.split('-').join('')
            let date2 = new Date(result[0][0].releaseDate)
            console.log(date2)
            let arr = []
            // if (date > now) {
            //     for(let i = 0;i<6;i++){
            //         const day = new Date(date2)
            //         day.setDate(date2.getDate() + i)
            //         arr.push(day.toISOString().split('T')[0])
            //     }
            //     // console.log(arr)
            //     return res.status(200).json({message:"success",data:arr,duration:result[0][0].duration})
            // }
            for(let i = 0;i<5;i++){
                const day = new Date(now1)
                day.setDate(now1.getDate() + i)
                arr.push(day.toISOString().split('T')[0])
            }
            // console.log(arr)
            return res.status(200).json({message:"success",data:arr,duration:result[0][0].duration})
            
           
        } catch (error) {
            res.status(400).json({message:"server error"})
        }
    },
    getRoom: async (req, res) => {
        try {
            const result = await setupFilmServices.getRoom()
            res.status(200).json({message:"success",data:result[0]})
        } catch (error) {
            res.status(400).json({message:"server error"})
        }
    },
    getShowTime: async (req, res) => {
        try {
            const result = await setupFilmServices.getShowTime()
            res.status(200).json({message:"success",data:result[0]})
        } catch (error) {
            res.status(400).json({message:"server error"})
        }
    },
    addShowTime: async (req, res) => {
        const {data} = req.body
        console.log(data)
        // console.log(data)
        try {
            await Promise.all(data.map(async (item)=>{
                const result = await setupFilmServices.addShowTime(item)
            }))
            // const result = await setupFilmServices.addShowTime(arr)
            const result2 = await setupFilmServices.getAllDayShowTime()
            res.status(200).json({message:"success",data:result2[0]})
        } catch (error) {
            res.status(400).json({message:"server error"})
        }
    },
    getAllDayShowTime: async (req, res) => {
        let now = new Date().toISOString().split('T')[0].split('-').join('');
        console.log(now)
        try {
            const result = await setupFilmServices.getAllDayShowTime()
            let arr = []
            result[0].forEach(element => {
                if( element.date_show.toISOString().split('T')[0].split('-').join('') >= now){
                    arr.push(element)
                }
            });
           
            console.log(result[0][0].date_show.toISOString().split('T')[0].split('-').join(''))
            res.status(200).json({message:"success",data:arr})
        } catch (error) {
            res.status(400).json({message:"server error"})
        }
    },
    checkShowTime: async (req, res) => {
        const {room,date,film,duration} = req.body
       try {
        const result = await setupFilmServices.checkShowTime(room,date)
        res.status(200).json({message:"success",data:result[0]})
       } catch (error) {
        res.status(400).json({message:"server error"})
       }
    },
    getFilmSetup: async (req, res) => {
        const {id} = req.params
        try {
            const result = await setupFilmServices.getFilmSetup(id)
            res.status(200).json({message:"success",data:result[0]})
        } catch (error) {
            res.status(400).json({message:"server error"})
        }
    },
    getFilmChoose: async (req, res) => {
        const {d} = req.query
        console.log(d.split('-').join(''))
        try {
            const result = await setupFilmServices.getFilmChoose()
            // console.log(result[0])
            // console.log(result[0][0].releaseDate.split('T')[0].split('-').join(''))
            let arr = []
            result[0].map((item)=>{
                if (item.releaseDate.split('T')[0].split('-').join('') <= d.split('-').join('')) {
                    arr.push(item)      
                }
            })
            res.status(200).json({message:"success",data:arr})
        } catch (error) {
            res.status(400).json({message:"server error"})
        }
    }
}

module.exports = setupFilmController