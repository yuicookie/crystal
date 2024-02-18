const TYPE = {
	Gacha: 0,
	CookiePet: 1,
	Level: 2,
	Limited: 3,
	Trophy:4
}
const TREASURES = [
	{
		id: 0,
		name: "パールクリスタルイヤリング",
		amt: 1,
		minp: 5,
		maxp: 50,
		type: TYPE.Gacha,
		a: true,
	},
	{
		id: 1,
		name: "レアクリスタルサファイア",//
		amt: 2,
		minp: 5,
		maxp: 50,
		type: TYPE.Gacha,
	},
	{
		id: 2,
		name: "珍しいクリスタル貝殻",//
		amt: 10,
		minp: 1,
		maxp: 11,
		type: TYPE.Gacha,
	},
	{
		id: 3,
		name: "大きなクリスタル原石",
		amt: 5,
		minp: 2,
		maxp: 21,
		type: TYPE.Gacha,
	},
	{
		id: 4,
		name: "最高級クリスタルジュエリーボックス",//
		amt: 7,
		minp: 2,
		maxp: 16,
		type: TYPE.Gacha,
	},
	{
		id: 5,
		name: "透明なクリスタル目覚まし時計",
		amt: 12,
		minp: 1,
		maxp: 10,
		type: TYPE.Gacha,
	},
	{
		id: 6,
		name: "キングクリスタルジュエリーリング",//
		amt: 4,
		minp: 4,
		maxp: 27,
		type: TYPE.Gacha,
	},
	{
		id: 7,
		name: "クリスタルフォークスプーン",//
		amt: 9,
		minp: 1,
		maxp: 12,
		type: TYPE.Gacha,
        webp:true
	},
	{
		id: 8,
		name: "心に抱く神聖なクリスタルの剣",//
		amt: 3,
		minp: 3,
		maxp: 33,
		type: TYPE.Gacha,
        webp:true
	},
	{
		id: 9,
		name: "巨大チョコドロップのゼリー王冠",//
		amt: 1,
		minp: 15,
		maxp: 60,
		type: TYPE.CookiePet,
	},
	{
		id: 10,
		name: "スノーグローブのクリスタル王冠",
		amt: 1,
		minp: 15,
		maxp: 60,
		type: TYPE.CookiePet,
	},
	{
		id: 11,
		name: "預言者味クッキーのカリカリひげ",//
		amt: 2,
		minp: 7,
		maxp: 30,
		type: TYPE.CookiePet,
	},
	{
		id: 12,
		name: "水晶を歌う水曜日の鐘",//
		amt: 1,
		maxamt: 2,
		minp: 14.28,
		maxp: 14.28,
		type: TYPE.Limited,
	},
	{
		id: 13,
		name: "オリジナルジンジャーブラッド",//
		amt: 1,
		minp: 30,
		maxp: 60,
		type: TYPE.Limited,
	},
	{
		id: 14,
		name: "2016 クリスタルモンキー",//
		amt: 1,
		minp: 5,
		maxp: 50,
		type: TYPE.Limited,
        webp:true
	},
	{
		id: 15,
		name: "キュートなミニクリスタルクッション",//
		amt: 8,
		minp: 8,
		maxp: 16,
		type: TYPE.Limited,
	},
	{
		id: 16,
		name: "ミニクリスタルフィギュア",//
		amt: 9,
		minp: 7,
		maxp: 14,
		type: TYPE.Limited,
        webp:true
	},
	{
		id: 17,
		name: "ミニクリスタルルーレット",//
		amt: 8,
		minp: 2,
		maxp: 16,
		type: TYPE.Limited,
	},
	{
		id: 18,
		name: "どこかで見覚えがある蒼く輝くネックレス",
		amt: 1,
		minp: 5,
		maxp: 50,
		type: TYPE.Limited,
	},
	{
		id: 19,
		name: "Lv.50 ゴールデンクッキークラブトロフィー",//
		amt: 2,
		minp: 20,
		maxp: 50,
		type: TYPE.Level,
	},
	{
		id: 20,
		name: "Lv.60 レジェンドクッキークラブトロフィー",//
		amt: 3,
		minp: 20,
		maxp: 50,
		type: TYPE.Level,
	},
	{
		id: 21,
		name: "Lv.70私はクッキーだクラブトロフィー",
		amt: 5,
		minp: 10,
		maxp: 30,
		type: TYPE.Level,
	},
	{
		id: 22,
		name: "Lv.80プレミアムクッキーズクラブトロフィー",
		amt: 6,
		minp: 10,
		maxp: 25,
		type: TYPE.Level,
	},
	{
		id: 23,
		name: "Lv.90 VIPクッキーズクラブのトロフィー",
		amt: 9,
		minp: 6,
		maxp: 16,
		type: TYPE.Level,
        webp:true
	},
	{
		id: 24,
		name: "Lv.100 夢実現クッキーズクラブのトロフィー",
		amt: 10,
		minp: 5,
		maxp: 15,
		type: TYPE.Level,
        webp:true
	},
	{
		id: 201,
		name: "新芽1ランクの貴重な栄光のトロフィー",//
		amt: 1,
		minp: 40,
		maxp: 50,
		type: TYPE.Trophy
	},
	{
		id: 202,
		name: "新芽2ランクの貴重な栄光のトロフィー",//
		amt: 1,
		minp: 40,
		maxp: 50,
		type: TYPE.Trophy
	},
	{
		id: 203,
		name: "新芽3ランクの貴重な栄光のトロフィー",//
		amt: 1,
		minp: 40,
		maxp: 50,
		type: TYPE.Trophy
	},
	{
		id: 204,
		name: "新芽4ランクの貴重な栄光のトロフィー",//
		amt: 1,
		minp: 40,
		maxp: 50,
		type: TYPE.Trophy
	},
	{
		id: 205,
		name: "新芽5ランクの貴重な栄光のトロフィー",//
		amt: 1,
		minp: 40,
		maxp: 50,
		type: TYPE.Trophy
	},
	{
		id: 206,
		name: "重水1ランクのすごい栄光のトロフィー",//
		amt: 1,
		minp: 40,
		maxp: 51,
		type: TYPE.Trophy
	},
	{
		id: 207,
		name: "重水2ランクのすごい栄光のトロフィー",//
		amt: 1,
		minp: 40,
		maxp: 51,
		type: TYPE.Trophy
	},{
		id: 208,
		name: "重水3ランクのすごい栄光のトロフィー",//
		amt: 1,
		minp: 40,
		maxp: 51,
		type: TYPE.Trophy
	},{
		id: 209,
		name: "重水4ランクのすごい栄光のトロフィー",//
		amt: 1,
		minp: 40,
		maxp: 51,
		type: TYPE.Trophy
	},{
		id: 210,
		name: "重水5ランクのすごい栄光のトロフィー",//
		amt: 1,
		minp: 40,
		maxp: 51,
		type: TYPE.Trophy
	},{
		id: 211,
		name: "高水準1ランクの巨大な栄光のトロフィー",//
		amt: 1,
		minp: 40,
		maxp: 52,
		type: TYPE.Trophy
	},
	{
		id: 212,
		name: "高水準2ランクの巨大な栄光のトロフィー",//
		amt: 1,
		minp: 40,
		maxp: 52,
		type: TYPE.Trophy
	},
	{
		id: 213,
		name: "高水準3ランクの巨大な栄光のトロフィー",//
		amt: 1,
		minp: 40,
		maxp: 52,
		type: TYPE.Trophy
	},
	{
		id: 214,
		name: "高水準4ランクの巨大な栄光のトロフィー",//
		amt: 1,
		minp: 40,
		maxp: 52,
		type: TYPE.Trophy
	},
	{
		id: 215,
		name: "高水準5ランクの巨大な栄光のトロフィー",//
		amt: 1,
		minp: 40,
		maxp: 52,
		type: TYPE.Trophy
	},
	{
		id: 216,
		name: "ヒーロー1ランクのヒーロー栄光のトロフィー",//
		amt: 1,
		minp: 40,
		maxp: 53,
		type: TYPE.Trophy
	},
	{
		id: 217,
		name: "ヒーロー2ランクのヒーロー栄光のトロフィー",//
		amt: 1,
		minp: 40,
		maxp: 53,
		type: TYPE.Trophy
	},{
		id: 218,
		name: "ヒーロー3ランクのヒーロー栄光のトロフィー",//
		amt: 1,
		minp: 40,
		maxp: 53,
		type: TYPE.Trophy
	},{
		id: 219,
		name: "ヒーロー4ランクのヒーロー栄光のトロフィー",//
		amt: 1,
		minp: 40,
		maxp: 53,
		type: TYPE.Trophy
	},{
		id: 220,
		name: "ヒーロー5ランクのヒーロー栄光のトロフィー",//
		amt: 1,
		minp: 40,
		maxp: 53,
		type: TYPE.Trophy
	},
	{
		id: 221,
		name: "超人1ランクの偉大な栄光のトロフィー",//
		amt: 1,
		minp: 40,
		maxp: 54,
		type: TYPE.Trophy
	},
	{
		id: 222,
		name: "超人2ランクの偉大な栄光のトロフィー",//
		amt: 1,
		minp: 40,
		maxp: 54,
		type: TYPE.Trophy
	},{
		id: 223,
		name: "超人3ランクの偉大な栄光のトロフィー",//
		amt: 1,
		minp: 40,
		maxp: 54,
		type: TYPE.Trophy
	},{
		id: 224,
		name: "超人4ランクの偉大な栄光のトロフィー",//
		amt: 1,
		minp: 40,
		maxp: 54,
		type: TYPE.Trophy
	},{
		id: 225,
		name: "超人5ランクの偉大な栄光のトロフィー",//
		amt: 1,
		minp: 40,
		maxp: 54,
		type: TYPE.Trophy
	},
	{
		id: 226,
		name: "帝王1ランクの幻想的な栄光のトロフィー",//
		amt: 1,
		minp: 40,
		maxp: 56,
		type: TYPE.Trophy
	},
	{
		id: 227,
		name: "帝王2ランクの幻想的な栄光のトロフィー",//
		amt: 1,
		minp: 40,
		maxp: 56,
		type: TYPE.Trophy
	},
	{
		id: 228,
		name: "帝王3ランクの幻想的な栄光のトロフィー",//
		amt: 1,
		minp: 40,
		maxp: 56,
		type: TYPE.Trophy
	},
	{
		id: 229,
		name: "帝王4ランクの幻想的な栄光のトロフィー",//
		amt: 1,
		minp: 40,
		maxp: 56,
		type: TYPE.Trophy
	},
	{
		id: 230,
		name: "帝王5ランクの幻想的な栄光のトロフィー",//
		amt: 1,
		minp: 40,
		maxp: 56,
		type: TYPE.Trophy
	},
	{
		id: 231,
		name: "レジェンド1ランクのレジェンド栄光のトロフィー",//
		amt: 1,
		minp: 40,
		maxp: 58,
		type: TYPE.Trophy
	},{
		id: 232,
		name: "レジェンド2ランクのレジェンド栄光のトロフィー",//
		amt: 1,
		minp: 40,
		maxp: 58,
		type: TYPE.Trophy
	},{
		id: 233,
		name: "レジェンド3ランクのレジェンド栄光のトロフィー",//
		amt: 1,
		minp: 40,
		maxp: 58,
		type: TYPE.Trophy
	},{
		id: 234,
		name: "レジェンド4ランクのレジェンド栄光のトロフィー",//
		amt: 1,
		minp: 40,
		maxp: 58,
		type: TYPE.Trophy
	},{
		id: 235,
		name: "レジェンド5ランクのレジェンド栄光のトロフィー",//
		amt: 1,
		minp: 40,
		maxp: 58,
		type: TYPE.Trophy
	},
	{
		id: 236,
		name: "神ランクの輝かしい栄光のトロフィー",//
		amt: 1,
		minp: 40,
		maxp: 60,
		type: TYPE.Trophy
	},
]
const REWARD_TREASURES = [
	{
		id: 100,
		minp: 40,
		minscore: 0,
		maxp: 50,
	},
	{
		id: 101,
		minp: 41,
		minscore: 1, //100 만점 단위
		maxp: 51,
	},
	{
		id: 102,
		minp: 42,
		minscore: 2,
		maxp: 52,
	},
	{
		id: 103,
		minp: 43,
		minscore: 3,
		maxp: 53,
	},
	{
		id: 104,
		minp: 44,
		minscore: 4,
		maxp: 54,
	},
	{
		id: 105,
		minp: 45,
		minscore: 5,
		maxp: 55,
	},
	{
		id: 106,
		minp: 46,
		minscore: 6,
		maxp: 56,
	},
	{
		id: 107,
		minp: 47,
		minscore: 7,
		maxp: 57,
	},
	{
		id: 108,
		minp: 48,
		minscore: 8,
		maxp: 58,
	},
	{
		id: 109,
		minp: 49,
		minscore: 9,
		maxp: 59,
	},
	{
		id: 110,
		minp: 50,
		minscore: 10,
		maxp: 60,
	},
	{
		id: 111,
		minp: 51,
		minscore: 20,
		maxp: 61,
	},
	{
		id: 112,
		minp: 52,
		minscore: 30,
		maxp: 62,
	},
	{
		id: 113,
		minp: 53,
		minscore: 40,
		maxp: 63,
	},
	{
		id: 114,
		minp: 54,
		minscore: 50,
		maxp: 64,
	},
	{
		id: 115,
		minp: 55,
		minscore: 60,
		maxp: 65,
	},
	{
		id: 116,
		minp: 56,
		minscore: 70,
		maxp: 66,
	},
	{
		id: 117,
		minp: 57,
		minscore: 80,
		maxp: 67,
	},
	{
		id: 118,
		minp: 58,
		minscore: 90,
		maxp: 68,
	},
	{
		id: 119,
		minp: 60,
		minscore: 100,
		maxp: 70,
	},
]
function getValues(treasure,lvl)
{
    let amt = treasure.amt ? treasure.amt : 1
    if(lvl === 9 && treasure.maxamt) amt = treasure.maxamt

    let prob = getProb(treasure.minp,treasure.maxp,lvl)

    return [amt,prob]
}

function getDesc(treasure,lvl) {
    const [amt,prob] = getValues(treasure,lvl)
    return `その日の初ログイン時にクリスタル${amt}個を${prob}%の確率で獲得`
}
function sample(treasure,lvl){
    const [amt,prob] = getValues(treasure,lvl)
	return Math.random() * 100 < prob ? amt :0
}
function getExpectedValue(treasure,lvl){
    const [amt,prob] = getValues(treasure,lvl)
    return round(amt * prob /100,-4)
}
function getVar(treasure,lvl){
    const [amt,prob] = getValues(treasure,lvl)
	let p=prob /100
	// console.log(amt * p * (1-p))
    return amt * p * (1-p)
}
function getScoreStr(score) {
	if (score === 100) return "1億"
	return `${score}00万`
}
/**
 *
 * @param {*} minscore 100 만점 단위
 */
function getRewardTreasureName(minscore) {
	if (minscore === 0) return "激変前に一緒にいた証"
	return `激変前${getScoreStr(minscore)}点の証`
}

function getProb(p, maxp, lvl) {
	if (lvl <= 0) return p
	if (lvl >= 9) return maxp
    if(p === maxp) return p

	let diff = maxp - p
	if (Number.isInteger(diff / 9)) {
		return round(p + (diff / 9) * lvl,-2)
	}
    else if(Number.isInteger(diff / 10)){
		return round(p + diff / 10 * lvl,-2)
	}
	else {
		return round(p + floor(diff / 9,-1) * lvl,-2)
	}
}
function isRewardTr(tr){
	return tr.id >= 100 && tr.id < 200
}
function getImg(tr){
	let isReward = isRewardTr(tr)
	let src = `img/tr/${tr.id}.` + (tr.webp ? "webp" : "png")
	if (isReward) src = `img/tr/reward/tr_reward_${tr.minscore}00.` + (tr.webp ? "webp" : "png")
	if(tr.id>=200) src = `img/tr/trophy/trophy (${tr.id-200}).png`
	return src
}