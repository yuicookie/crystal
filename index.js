const State = {
	selectionOpen: true,
	settingOpen: false,
	maxSerial: 0,
	settingSerial: -1,
	settingLvl: -1,
	settingTr: -1,
	resultHidden:false,
	currentExpVal:0,
	attendanceReward:""
}
const sleep = (m) => new Promise((r) => setTimeout(r, m))

const TR_DICT = new Map() // id => treasure obj
function isMobile() {
	return window.innerWidth < 700
}
function setSetting(id, lvl) {
	$addClass("#tr-setting-empty-tr", "hidden")
	$removeClass("#tr-setting-tr", "hidden")
	const tr = TR_DICT.get(Number(id))
	let html = treasureBody(tr, lvl)
	//console.log(lvl)
	const name = !isRewardTr(tr) ? tr.name : getRewardTreasureName(tr.minscore)
	$html("#tr-setting-tr-name", name)
	$html("#tr-setting-tr", html)
	$html("#tr-setting-desc", getDesc(tr, lvl))
	$html("#tr-setting-exp", getExpectedValue(tr, lvl))
	$removeClass(".tr-btn", "disabled")
	$removeClass(".tr-btn", "selected")
	$addClass("#tr-" + lvl + "-btn", "selected")
	$removeClass("#tr-next-btn", "disabled")
}

function onModalOpen() {
	if (isMobile()) {
		$removeClass(".shadow", "hidden")
	}
	$addClass("html", "scroll-lock")
}
function onModalClose() {
	$addClass(".shadow", "hidden")
	$removeClass("html", "scroll-lock")
}
function openSetting(id, lvl, serial) {
	State.settingSerial = serial
	State.settingLvl = lvl
	State.settingTr = id
	if (id !== null) setSetting(id, lvl)
	$removeClass("#tr-setting", "hidden")
	$addClass(".tr-setting-container", "hidden")
	$removeClass("#tr-one-setting", "hidden")
	$removeClass(".tr-displayed", "active")
	$addClass("#_tr-" + serial, "active")
	onModalOpen()
	$html("#modal-title", "宝物修正")
	$html("#tr-one-setting-serial", "#" + serial)
}
function openSelection() {
	$removeClass("#tr-setting", "hidden")
	$addClass(".tr-setting-container", "hidden")
	$removeClass("#tr-selection", "hidden")
	onModalOpen()
	$html("#modal-title", "宝物追加")
}

function closeModal() {
	closeAttendance()
	$addClass("#tr-setting", "hidden")
	onModalClose()
}
function removeTreasure() {
	if (State.settingTr === -1) return
	$one("#_tr-" + State.settingSerial).remove()
	if (isMobile()) {
		closeModal()
	} else openNextTreasure()
	onTreasureChange()
}

function getCount() {
	let count = prompt("複製する個数を入力してください", "1")
	if (count === null) return 0
	if (Number(count) < 1 || Number(count) > 100 || isNaN(Number(count))) {
		showToast("1~100までの数値を入力してください")
		return 0
	}
	return Number(count)
}
function copyTreasure() {
	if (State.settingTr === -1) return
	let count = getCount()
	if (count <= 0) return

	for (let i = 0; i < count; ++i) addTreasure(Number(State.settingTr), Number(State.settingLvl))
	// openSetting(Number($data(node, "id")), Number($data(node, "lvl")), Number($data(node, "serial")))
	clearSetting()
	if (isMobile()) {
		closeModal()
	}
	gtag("event", "tr_copy", { count: count })
}

function setTreasureLvl(lvl) {
	if (State.settingTr === -1) return

	if (State.settingLvl < 0 || State.settingLvl === lvl) return
	changeTreasureLvl(lvl,State.settingSerial)
	State.settingLvl = lvl
	setSetting(State.settingTr, lvl)
	onTreasureChange()
	//gtag("event", "tr_level_change", {})
}


function changeTreasureLvl(lvl,serial){
	$data($one("#_tr-" + serial), "lvl", String(lvl))

	let elem = $one("#_tr-" + serial + " .tr-lvl")
	if (elem) {
		if (lvl === 0) elem.remove()
		else if (lvl === 9) {
			elem.classList.add("lvl-9")
			elem.innerHTML = "+9"
		} else {
			elem.classList.remove("lvl-9")
			elem.innerHTML = "+" + lvl
		}
	} else if (lvl > 0) {
		let html = ` <b class="tr-lvl ${lvl === 9 ? "lvl-9" : ""}">+${lvl}</b>`
		$append($one("#_tr-" + serial), html)
	}
}

function openNextTreasure(stopOnNotFound) {
	let start = State.settingSerial - 1
	if (State.settingSerial === -1) start = State.maxSerial

	let next = null
	for (let i = start; i >= 0; --i) {
		next = $one("#_tr-" + i)
		if (next) break
	}

	if (next && $hasClass(next, "tr-displayed")) {
		openSetting(Number($data(next, "id")), Number($data(next, "lvl")), Number($data(next, "serial")))
	} else if (!stopOnNotFound) {
		clearSetting()
	}
}
function goNextTreasure() {
	if (State.settingSerial === -1) return
	openNextTreasure(true)
}
function settingEventListener() {
	for (let i = 0; i <= 9; ++i) {
		$onclick("#tr-" + i + "-btn", () => setTreasureLvl(i))
	}
	$onclick("#tr-copy-btn", copyTreasure)
	$onclick("#tr-remove-btn", removeTreasure)
	$onclick("#tr-next-btn", goNextTreasure)
}

function addTreasure(id, lvl) {
	const tr = TR_DICT.get(id)
	let node = $node(displayedTreasure(tr, lvl, State.maxSerial))
	node.addEventListener("click", (e) =>
		openSetting(
			Number($data(e.currentTarget, "id")),
			Number($data(e.currentTarget, "lvl")),
			Number($data(e.currentTarget, "serial"))
		)
	)

	State.maxSerial++
	$one("#tr-add-btn").after(node)
	$addClass(".empty-tr-temp", "hidden")
	onTreasureChange()
	return node
}

function clearSetting() {
	$removeClass("#tr-setting-empty-tr", "hidden")
	$addClass("#tr-setting-tr", "hidden")
	$html("#tr-setting-desc", "..")
	$html("#tr-setting-exp", "?")
	$addClass(".tr-btn", "disabled")
	$removeClass(".tr-btn", "selected")
	$html("#tr-setting-tr-name", "宝物を選択してください")
	$removeClass(".tr-displayed", "active")
	$addClass("#tr-next-btn", "disabled")
	;(State.settingSerial = -1), (State.settingLvl = -1), (State.settingTr = -1)
}
function main() {
	$addClass(".tr-btn", "disabled")

	initSelectionWindow()
	clearSetting()
	if (isMobile()) closeModal()
	$onclick(".tr-selection", function (e) {
		if (isMobile()) $addClass("#tr-setting", "hidden")
		onModalClose()
		let id = Number($data(e.currentTarget, "id"))
		// console.log(id)

		addTreasure(id, $one("#lvl-9-checkbox").checked ? 9 : 0)
		window.scroll(0, 0)

	})
	$onclick("#tr-setting-close", closeModal)
	$onclick("#tr-add-btn", function () {
		$removeClass("#tr-setting", "hidden")
		openSelection()
	})
	$onclick("#tr-add-floating-btn", function () {
		$removeClass("#tr-setting", "hidden")
		openSelection()
	})
	$onclick(".tr-btn", function () {
		if (isMobile()) closeModal()
	})
	$onclick("#clear-btn", removeAll)
	$onclick("#save-btn", save)
	$onclick("#share-btn", share)
	$onclick("#load-btn", load)
	$onclick(".shadow", closeModal)
	$onclick("#sim-btn", simulate)
	settingEventListener()
	let query = new URLSearchParams(window.location.search)
	if (query.has("state")) decodeState(query.get("state"))
	if (query.has("reward")) decodeRewardAndShow(query.get("reward"))

	$one("#lvl-9-checkbox").addEventListener("change", function (e) {
		change9Checkbox(e.currentTarget.checked)
	})
	$onclick("#check-prob-btn", checkProb)
	$onclick("#to-lvl9-btn",toLvl9)
	$onclick("#result-hide-btn",toggleResult)
	// $onclick(".counter",function(e){
	// 	e.currentTarget.innerHTML = Number(e.currentTarget.innerHTML) + 1
	// })
	$onclick("#growth-btn",()=>showGrowth(State.currentExpVal))
	$onclick("#attend-btn",()=>{
		gtag("event", "attendance", {})
		let rewards = genAttendenceReward()
		showAttendence(rewards)
		document.getElementById("reward-container").scroll({top: 0,});//スクロール一番上
	})
	$onclick("#close-attend-btn",closeAttendance)
	$onclick("#share-attend-btn",share)
}
function shareAttendance(){

}
function closeAttendance(){
	$addClass("#attendance-modal","hidden")
	State.attendanceReward=""
	onModalClose()
}

function toggleResult(){
	if(State.resultHidden){
		State.resultHidden=false
		$removeClass("#hidden-result","hidden")
		$html("#result-hide-btn","&#9664;")//閉じる

	}
	else{
		State.resultHidden=true
		$addClass("#hidden-result","hidden")
		$html("#result-hide-btn","&#9660;")//開く

	}
}
function change9Checkbox(checked) {
	if (checked) $removeClass(".tr-selection .lvl-9", "hidden")
	else $addClass(".tr-selection .lvl-9", "hidden")
}
function toLvl9(){
	if (!confirm("本当に全ての宝物を+9に変更しますか？")) return
	for (const elem of $(".tr-displayed")) {
		let serial = Number($data(elem, "serial"))
		changeTreasureLvl(9,serial)
	}
	onTreasureChange()
	window.scroll(0, 0)

}

function selectionTreasure(tr) {
	let isReward = isRewardTr(tr)
	let src = `img/tr/${tr.id}.` + (tr.webp ? "webp" : "png")
	if (isReward) src = `img/tr/reward/tr_reward_${tr.minscore}00.` + (tr.webp ? "webp" : "png")
	let name = !isReward ? tr.name : getRewardTreasureName(tr.minscore)
	return `
    <div class="tr tr-selection" title="${name}" data-id='${tr.id}'>
        <img src="img/${tr.a ? "frame-a" : "frame"}.png">
        <img class="tr-img" src="${getImg(tr)}">
        <img class="tr-img" src="img/passive.png">
		<b class="tr-lvl lvl-9">+9</b>
    </div>
    `
	//        <b class="tr-add-hover">+</b>

}
function displayedTreasure(tr, lvl, serial) {
	if (!lvl) lvl = 0

	//let src = `img/tr/${tr.id}.` + (tr.webp ? "webp" : "png")
	//if (isReward) src = `img/tr/reward/tr_reward_${tr.minscore}00.` + (tr.webp ? "webp" : "png")
	return `
    <div class="tr tr-displayed" data-id='${tr.id}' data-lvl='${lvl}' data-serial='${serial}' id='_tr-${serial}'>
       ${treasureBody(tr, lvl)}
    </div>
    `
}
/*
 <img src="img/${tr.a ? "frame-a" : "frame"}.png">
        <img class="tr-img" src="${src}">
        <img class="tr-img" src="img/passive.png">
        ${lvl > 0 ? `<b class="tr-lvl ${lvl === 9 ? "lvl-9" : ""}">+${lvl}</b>` : ""}*/

function treasureBody(tr, lvl) {
	if (!lvl) lvl = 0
	let isReward = isRewardTr(tr)
	let src = `img/tr/${tr.id}.` + (tr.webp ? "webp" : "png")
	if (isReward) src = `img/tr/reward/tr_reward_${tr.minscore}00.` + (tr.webp ? "webp" : "png")
	let lvl9 = lvl === 9 ? "lvl-9" : ""

	let lvltext = lvl > 0 ? '<b class="tr-lvl ' + lvl9 + '">+' + lvl + "</b>" : ""
	return ` <img src="img/${tr.a ? "frame-a" : "frame"}.png">
    <img class="tr-img" src="${getImg(tr)}">
    <img class="tr-img" src="img/passive.png">
    ${lvltext}`
}

function initSelectionWindow() {
	let $gacha = ""
	let $cookiepet = ""
	let $limited = ""
	let $level = ""
	let $reward = ""
	let $trophy=""

	for (const tr of TREASURES) {
		TR_DICT.set(tr.id, tr)
		const str = selectionTreasure(tr)
		if (tr.type === TYPE.Gacha) $gacha += str
		else if (tr.type === TYPE.CookiePet) $cookiepet += str
		else if (tr.type === TYPE.Limited) $limited += str
		else if (tr.type === TYPE.Level) $level += str
		else if (tr.type === TYPE.Trophy) $trophy += str
	}
	for (const tr of REWARD_TREASURES) {
		TR_DICT.set(tr.id, tr)
		$reward += selectionTreasure(tr)
	}
	$one("#tr-selection-gacha").innerHTML = $gacha
	$one("#tr-selection-cookiepet").innerHTML = $cookiepet

	$one("#tr-selection-limited").innerHTML = $limited

	$one("#tr-selection-level").innerHTML = $level
	$one("#tr-selection-reward").innerHTML = $reward
	$one("#tr-selection-trophy").innerHTML = $trophy

}
function removeAll() {
	if (!confirm("全ての設定をリセットしますか？")) return

	clearSetting()
	$(".tr-displayed").forEach((e) => e.remove())
	onTreasureChange()
	$removeClass(".empty-tr-temp", "hidden")
	clearSearchQueryString()
	gtag("event", "remove_all", {})
}
function clearSearchQueryString() {
	const newUrl = window.location.origin + window.location.pathname
	window.history.replaceState({}, document.title, newUrl)
}

function decodeState(encodedString) {
	var str = atob(encodedString)

	const trs = str.split(",")
	for (const tr of trs.reverse()) {
		if (!tr || tr === "") continue
		const [id, lvl] = tr.split("-")
		addTreasure(Number(id), Number(lvl))
	}
}

function encodeCurrentState() {
	let str = ""
	for (const elem of $(".tr-displayed")) {
		let id = Number($data(elem, "id"))
		let lvl = Number($data(elem, "lvl"))
		str += `${id}-${lvl},`
	}
	var encodedString = btoa(str)

	return encodedString
}

let toastTimeout = null
function showToast(msg) {
	if (toastTimeout) clearTimeout(toastTimeout)

	const toast = document.getElementById("toast")
	toast.textContent = msg
	toast.classList.add("show")
	toastTimeout = setTimeout(() => $one("#toast").classList.remove("show"), 1500) // Adjust the duration as needed (in milliseconds)
}

function save() {
	const str = encodeCurrentState()
	if(!str || str===""){
		showToast("宝物を選択してください。")
		return
	}
	if (!confirm("設定をブラウザに保存しますか？以前に保存された設定は削除されます。")) return
	gtag("event", "save", {})

	
	// console.log(str)
	localStorage.setItem("cookierun-crystal-state", str)
	// alert("세팅이 브라우저에 저장되었습니다")
	showToast("設定がブラウザに保存されました。読み込むボタンから設定をロードできます。")
}
function share() {
	let str = encodeCurrentState()
	let rewardstr = State.attendanceReward
	let link = window.location.href.split("?")[0]+"?" + (str===""?"" : ("state=" + str)) 
	+ (rewardstr===""?"":("&reward=" + rewardstr))

	navigator.clipboard.writeText(link).then(() => {
		showToast("リンクがクリップボードにコピーされました。")
	})
	window.history.replaceState({}, document.title, link)
	gtag("event", "share", {})

	// $html("#share-area", link)
}
function load() {
	let str = localStorage.getItem("cookierun-crystal-state")
	if (!str || str === "") {
		showToast("保存された設定はありません。")
		return
	}
	gtag("event", "load", {})

	if (!confirm("保存した設定を読み込みますか？現在の設定は削除されます。")) return
	$(".tr-displayed").forEach((e) => e.remove())
	clearSetting()
	decodeState(str)
	window.scroll(0, 0)
}
window.onload = main

function pToPercent(p,digit) {
	if(!digit) digit=-6
	let result = round(p * 100, digit)
	if (Math.abs(0 - result) < 0.0000001) result = "0.000001% 未満"
	else result += "%"
	return result
}

/**
    recalculate total expected value * 
 */
function onTreasureChange() {
	const [maxamt, totalexp, maxprob, minprob] = calcStats()
	$html("#total-exp", round(totalexp, -4))
	State.currentExpVal = totalexp
	$html("#total-max", maxamt)
	$html("#total-min-prob", pToPercent(minprob))
	$html("#total-max-prob", pToPercent(maxprob))
	let months= $(".months-val")
	let mohthtotal = totalexp * 30
	months[0].innerHTML = Math.floor(mohthtotal/20)
	let val1= Math.floor(mohthtotal/25)
	let val2 = (Math.floor(mohthtotal/20))
	months[1].innerHTML = val1===val2 ? val1 :  val1+"~" +val2
	
	val1= Math.floor(mohthtotal/119)
	val2 = (Math.floor(mohthtotal/108))
	months[2].innerHTML = val1===val2 ? val1 :  val1+"~" +val2

	//  $html("#total-std",round(variance*total,-4))
}

function calcStats() {
	let maxamt = 0
	let totalexp = 0
	let maxprob = 1
	let minprob = 1
	for (const elem of $(".tr-displayed")) {
		let id = Number($data(elem, "id"))
		let lvl = Number($data(elem, "lvl"))
		const tr = TR_DICT.get(id)
		totalexp += getExpectedValue(tr, lvl)
		maxamt += getValues(tr, lvl)[0]
		let p = getValues(tr, lvl)[1] / 100
		maxprob *= p
		minprob *= 1 - p
	}
	return [maxamt, totalexp, maxprob, minprob]
}

function checkProb() {
	const elem = $one("#check-prob-btn")
	let std = Number($data(elem, "std"))
	let mean = Number($data(elem, "mean"))
	let max = Number($data(elem, "max"))
	if(!std) return
	let num = Number($one("#check-prob-input").value)
	if (!num || isNaN(num) || num < 0) {
		showToast("1以上の数値を入力してください")
		return
	}
	gtag("event", "check_prob", {})

	let p = 1 - normalcdf(mean, std, num)
	$html("#check-prob-result",((num > max) ?"0%": (pToPercent(p,-2)))+"の確率で"+num+"個以上獲得")
}

async function simulate() {
	let count = $(".tr-displayed").length
	if (count === 0) {
		showToast("宝物を選択してください")
		return
	}
	$removeClass("#loading", "hidden")
	$addClass("#sim-result-container", "hidden")
	$addClass("#growth-container","hidden")
	$addClass(".lvl-9-report","hidden")
	gtag("event", "simulation", {})
	$html("#check-prob-result","")
	await sleep(300)

	let n = 1000 * Math.sqrt(count)
	let record = []
	let maxAmt = 0 //보물 하나당 최대 크리스탈
	let avgLvl = 0

	const [maxtotal, totalexp] = calcStats()
	const quantiles = [0.1, 0.25, 0.5, 0.75]
	for (let i = 0; i < n; ++i) {
		let total = 0
		for (const elem of $(".tr-displayed")) {
			let id = Number($data(elem, "id"))
			let lvl = Number($data(elem, "lvl"))
			const tr = TR_DICT.get(id)
			const [baseamt, _] = getValues(tr, lvl)
			let amt = sample(tr, lvl)
			total += amt
			if (i === 0) {
				maxAmt = Math.max(maxAmt, baseamt)
				avgLvl += lvl
			}
		}
		record.push(total)
	}
	avgLvl /= count

	const [mean, std] = calcStd(record)
	let range = Math.max(1.5, std * 3)
	let minRange = Math.max(0, mean - range)
	let maxRange = mean + Math.max(maxAmt + 1, range)

	let lvl9record = []
	let lvl9ExpLine = {}
	let lvl9totalexp = 0
	if (avgLvl < 8) {
		for (let i = 0; i < n; ++i) {
			let total = 0
			for (const elem of $(".tr-displayed")) {
				let id = Number($data(elem, "id"))
				const tr = TR_DICT.get(id)
				total += sample(tr, 9)
				if (i === 0) {
					lvl9totalexp += getExpectedValue(tr, 9)
				}
			}
			lvl9record.push(total)
		}

		const [mean9, std9] = calcStd(lvl9record)
		let range9 = Math.max(1.5, std9 * 3)
		maxRange = Math.max(maxRange, mean9 + Math.max(maxAmt + 1, range9))

		lvl9ExpLine = {
			// Add a plot line for the mean value
			color: "green",
			dashStyle: "solid",
			value: lvl9totalexp, // Set the value to the mean value
			width: 2,
			zIndex: 1,
			label: {
				text: "+9強化時:" + round(lvl9totalexp, -1), // Label text for the mean value
				align: "center",
				style: {
					color: "green",
					fontWeight: "bold",
					fontSize: "20px",
				},
			},
		}
		let quantileDesc9=""
		$removeClass(".lvl-9-report","hidden")
		$(".lvl-9-report-val")[0].innerHTML = pToPercent((lvl9totalexp - totalexp) / totalexp,-2)
		$(".lvl-9-report-val")[1].innerHTML = `${round(totalexp,-2)} -> ${round(lvl9totalexp,-2)}`
		for (const q of quantiles) {
			let quantile = calculateQuantile(lvl9totalexp, std9, q)
			quantileDesc9 += `<li>${pToPercent(1 - q)}の確率で最小<b>${Math.max(0, round(quantile))}個</b>獲得
			</li>`
		}
		$html("#quantiles-9", quantileDesc9)

	}

	// if(avgLvl)
	// let cdf = 1 - normalcdf(totalexp, std, 2)
	
	let quantileDesc = ""

	const elem = $one("#check-prob-btn")
	$data(elem, "mean", totalexp)
	$data(elem, "std", std)
	$data(elem, "max", maxtotal)
	for (const q of quantiles) {
		let quantile = calculateQuantile(totalexp, std, q)
		quantileDesc += `<li>${pToPercent(1 - q)}の確率で最小<b>${Math.max(0, round(quantile))}個</b>獲得
		</li>`
	}
	$html("#quantiles", quantileDesc)

	Highcharts.chart("distribution", {
		style: {
			fontSize: "20px",
		},
		chart: {
			type: "bellcurve",
			backgroundColor: "#f5f3ee",
			margin: [50, 10, 90, 10],
		},
		title: {
			text: "ログイン報酬個数分布",
		},
		xAxis: {
			min: minRange, // Set the minimum value of the x-axis
			max: maxRange, // Set the maximum value of the x-axis
			title: {
				text: "クリスタル数",
			},
			labels: {
				style: {
					fontSize: "18px", // Set the font size for x-axis labels
				},
			},
			minTickInterval: 1,
			plotLines: [
				{
					// Add a plot line for the mean value
					color: "#E45536",
					dashStyle: "solid",
					value: totalexp, // Set the value to the mean value
					width: 2,
					zIndex: 1,
					label: {
						text: "期待値:" + round(totalexp, -1), // Label text for the mean value
						align: "center",
						style: {
							color: "#E45536",
							fontWeight: "bold",
							fontSize: "20px",
						},
					},
				},
				lvl9ExpLine,
			],
		},
		yAxis: {
			title: {
				text: "確率",
			},
			labels: {
				enabled: false,
			},
		},
		tooltip: {
			enabled: false, // Disable tooltips
		},
		series: [
			{
				name: "現在の予測値",
				type: "bellcurve",
				xAxis: 0,
				yAxis: 0,
				baseSeries: 1,
				intervals: 100,
				fillOpacity: 0.5,
				zIndex: -1,
				area: {
					states: {
						hover: {
							enabled: false,
						},
					},
				},
			},
			{
				name: "Data",
				type: "scatter",
				data: record,
				visible: false,
				showInLegend: false,
			},
			{
				name: "+9強化時の予測値",
				type: "bellcurve",
				xAxis: 0,
				yAxis: 0,
				baseSeries: 3,
				intervals: 100,
				color: "#FFD403",
				fillOpacity: 0.5,
				zIndex: -1,
				area: {
					states: {
						hover: {
							enabled: false,
						},
					},
				},
			},
			{
				name: "Data",
				type: "scatter",
				data: lvl9record,
				visible: false,
				showInLegend: false,
			},
		],
	})

	$addClass("#loading", "hidden")
	$removeClass("#sim-result-container", "hidden")
}
