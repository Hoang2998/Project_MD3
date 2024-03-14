const filmServices = require("../service/film.services")

const filmController = {
    getCategoryFilm: async (req, res) => {
        try {
            const result = await filmServices.getCategory()
            res.status(200).json({
                message: "success",
                data: result
            })
        } catch (error) {
            res.status(400).json({ message: "fail" })
        }
    },
    addCategory: async(req, res) => {
        const{name} = req.body
        try {
            const result = await filmServices.addCategory(name)
            const result2 = await filmServices.getCategory()
            res.status(200).json({
                message: "success",
                data: result2
            })
        } catch (error) {
            res.status(400).json({ message: "fail"})
        }
    },
    getFilms: async(req, res) => {
        try {
            const result = await filmServices.getFilms()
            const result2 = await filmServices.getCategory()
            console.log(result[0])
            res.status(200).json({ message: "success", data: result[0], data2: result2 })
        } catch (error) {
            res.status(400).json({ message: "fail" })
        }
    },
    getFilmsSetup: async(req, res) => {
        try {
            const now = new Date();
            const day = new Date(now)
            day.setDate(now.getDate() + 0)
            console.log(day.toISOString().split('T')[0].split('-').join(''))
            const result = await filmServices.getFilms()
            const result2 = await filmServices.getCategory()
            // console.log(result[0]
            let arr = []
            result[0].map((item)=>{
                if(item.releaseDate.split('-').join('') <= day.toISOString().split('T')[0].split('-').join('')){
                    arr.push(item)
                }
            })
            console.log(arr)
            res.status(200).json({ message: "success", data: arr, data2: result2 })
        } catch (error) {
            res.status(400).json({ message: "fail" })
        }
    },
    addFilm: async(req, res) => {
        const { name, duration, date, img, filmDetail, trailer } = req.body
        console.log(name, duration, date, img, filmDetail, trailer)
        if(name == "" || duration == "" || date == "" || img == "" || filmDetail == "" || trailer == ""){
           return res.status(400).json({ message: "Please fill in all fields" })
        }
        try {
            const result = await filmServices.addFilm(name, duration, date, img, filmDetail, trailer)
            const result2 = await filmServices.getFilms()
            res.status(200).json({ message: "success", data: result2 })
        } catch (error) {
            res.status(400).json({ message: "fail" })
        }
    },
    deleteFilm: async(req, res) => {
        const{id} = req.params
        try {
            const result = await filmServices.deleteFilm(id)
            const result2 = await filmServices.getFilms()
            res.status(200).json({ message: "success", data: result2 })
        } catch (error) {
            res.status(400).json({ message: "server error" })
        }
    },
    getFilmUpdate: async(req, res) => {
        const {id} = req.params
        try {
            const result = await filmServices.getFilmUpdate(id)
            res.status(200).json({ message: "success", data: result })
        } catch (error) {
            res.status(400).json({ message: "server error" })
        }
    },
    editfilm: async(req, res) => {
        const{id} = req.params
        const {name, duration, date, img, filmDetail, trailer, category} = req.body
        try {
            const result = await filmServices.editfilm(id, name, duration, date, img, filmDetail, trailer, category)
            const result2 = await filmServices.getFilms()
            res.status(203).json({ message: "success", data: result2 })
        } catch (error) {
            res.status(400).json({ message: "server error" })
        }
    },
    getCategoryForFilms:async(req,res)=>{
        try {
            const result = await filmServices.getCategoryForFilms()
            res.status(200).json({ message: "success", data: result })
        } catch (error) {
            res.status(400).json({ message: "server error" })
        }
    },
    addCategoryForFilm: async(req, res) => {
        const {idFilm, arr}  = req.body
        try {
            await Promise.all(arr.map(async(item)=>{
                const result = await filmServices.addCategoryForFilm(idFilm, item)
            }))
            const result2 = await filmServices.getFilms()
            const result3 = await filmServices.getCategoryForFilms()
            res.status(200).json({ message: "success", data: result2, data2: result3 })
        } catch (error) {
            res.status(400).json({ message: "server error" })
        }
    },
    getCategoryForFilmUpdate: async(req, res) => {
        const{idFilm} = req.query
        try {
            const result = await filmServices.getCategoryForFilmUpdate(idFilm)
            res.status(200).json({ message: "success", data: result })
        } catch (error) {
            res.status(400).json({ message: "server error" })
        }
    },
    editCategoryFilmUpdate: async(req, res) => {
        const {id} = req.params
        const {category} = req.body
        console.log(id, category)
        try {
            const result = await filmServices.deleteCategoryFilm(id)
            await Promise.all(category.map(async(item)=>{
                const result2 = await filmServices.addCategoryForFilm(id, item)
            }))
            const result3 = await filmServices.getFilms()
            const result4 = await filmServices.getCategoryForFilms()
            res.status(200).json({ message: "success", data: result3, data2: result4 })
        } catch (error) {
            res.status(400).json({ message: "server error" })
        }
    },
    getFilmComing: async(req, res) => {
        const now = new Date()
        try {
            const result = await filmServices.getFilms()
            // console.log(result[0][0].releaseDate)
            let arr = []
            result[0].forEach(element => {
                if( element.releaseDate.split('-').join('') >= now.toISOString().split('T')[0].split('-').join('')){
                    arr.push(element)
                }
            })
            console.log(arr)
            res.status(200).json({ message: "success", data: arr})
        } catch (error) {
            res.status(400).json({ message: "server error" })
        }
    },
    getFilmNowShowing: async(req, res) => {
        const now = new Date()
        try {
            const result = await filmServices.getFilms()
            // console.log(result[0][0].releaseDate)
            let arr = []
            result[0].forEach(element => {
                if( element.releaseDate.split('-').join('') <= now.toISOString().split('T')[0].split('-').join('')){
                    arr.push(element)
                }
            })
            console.log(arr)
            res.status(200).json({ message: "success", data: arr})
        } catch (error) {
            res.status(400).json({ message: "server error" })
        }
    },
    getDayForFilm: async(req, res) => {
        const {d} = req.query
        const now = new Date(d).toISOString().split('T')[0].split('-').join('')
        console.log(now)
        try {
            const result = await filmServices.getFilmsForDay()
            // console.log(new Date(result[0][1].date_show))
            let arr = []
            result[0].forEach(element => {
                if(element.date_show.toISOString().split('T')[0].split('-').join('') == now-1 ){
                    // console.log(element.date_show.toISOString().split('T')[0].split('-').join(''),"111111")
                    arr.push(element)
                }
                console.log(element.date_show.toISOString().split('T')[0].split('-').join(''))
            })
            
            res.status(200).json({ message: "success", data: arr})
        } catch (error) {
            res.status(400).json({ message: "server error" })
        }
    },
    getfilmBuyTicket: async(req, res) => {
        const {idFilm} = req.query
        try {
            const result = await filmServices.getFilmBuyTicket(idFilm)
            console.log(req.user)
            res.status(200).json({ message: "success", data: result,user : req.user})
        } catch (error) {
            res.status(400).json({ message: "server error" })
        }
    },
    getChair: async(req, res) => {
        try {
            const result = await filmServices.getChair()
            res.status(200).json({ message: "success", data: result })
        } catch (error) {
            res.status(400).json({ message: "server error" })
        }
    }
}


module.exports = filmController

