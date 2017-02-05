import { Document, model, Schema } from "mongoose";



export interface IList {
    data: IGoodsModel[]
    record: Number
};

interface IGoods {
    operator: number,
    store: number,
    class: number,
    code: string,
    name: string,
    portrait: string,
    short_name: string,
    unit: string,
    type: number,
    exchange_points: number,
    discount_rate: number,
    lowest_discount_rate: number,
    inventories: number,
    reward_points: number,
    entry_price: number,
    sale_price: number,
    remark: string
}

export interface IGoodsModel extends IGoods, Document {

};

let goodsSchema = new Schema({
    operator: Schema.Types.ObjectId,
    store: Schema.Types.ObjectId,
    class: Schema.Types.ObjectId,
    code: String,
    name: String,
    portrait: String,
    short_name: String,
    unit: String,
    type: Schema.Types.ObjectId,
    exchange_points: Number,
    discount_rate: Number,
    lowest_discount_rate: Number,
    inventories: Number,
    reward_points: Number,
    entry_price: Number,
    sale_price: Number,
    remark: String
});

// remove versionKey when send object to user.

goodsSchema.set('toJSON', { versionKey: false });
let Goods = model<IGoodsModel>('Goods', goodsSchema);

export default Goods;