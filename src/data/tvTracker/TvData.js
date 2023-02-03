export class TvData {
    constructor(id, title, backdropImageName) {
        this.id = id;
        this.title = title;
        this.backdropImageName = backdropImageName;
    }
}

export class DetailsTvData extends TvData {
    constructor(id, title, backdropImageName, details, posterImageName) {
        super(id, title, backdropImageName)
        this.details = details;
        this.posterImageName = posterImageName;
     }
}

export class FavoriteTvData extends TvData{
    constructor(id, title, backdropImageName, dateTimeAddedToFavorites){
        super(id, title, backdropImageName);
        this.dateTimeAddedToFavorites = dateTimeAddedToFavorites
    }
}