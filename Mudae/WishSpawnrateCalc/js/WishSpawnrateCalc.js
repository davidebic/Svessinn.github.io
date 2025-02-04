Vue.component("value-input", {
	props: {
		id: String,
		label: String,
		faIcon: String,
		value: Number,
		minTick: Number,
		maxTick: Number,
		tickVals: Array,
		isRank: Boolean
	},
	template: `
                  <div class="value-input">
                    <div class="form-group">
                      <label :for="id">{{label}}</label>
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text"><i :class="'fas fa-' + faIcon"></i></span>
                        </div>
                        <input type="number" class="form-control" id="claimRank" :placeholder="label" :value="value" @input="updateValue" :min="minTick" pattern="\d+" required>
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="btn-group d-flex">
                      <button v-for="tick of allTicks" type="button" class="btn btn-light" :value="tick.value" @click="changeValue">{{tick.label}}</button>
                    </div>
                    </div>
                  </div>
                `,
	computed: {
		allTicks: function () {
			this.tickVals.sort();
			ticks = [];
			tick_labels = [];

			for (let val of this.tickVals.reverse()) {
				tick = {
					value: this.isRank ? val : -1 * val
				};
				tick.label = tick.value > 0 ? `+${tick.value}` : tick.value;
				ticks.push(tick);
			}

			for (let val of this.tickVals.reverse()) {
				tick = {
					value: this.isRank ? -1 * val : val
				};
				tick.label = tick.value > 0 ? `+${tick.value}` : tick.value;
				ticks.push(tick);
			}

			if (this.maxTick) {
				if (this.isRank) {
					ticks.unshift({
						value: this.maxTick,
						label: `Worst: ${this.maxTick}`
					});
					ticks.push({
						value: this.minTick,
						label: `Best: ${this.minTick}`
					});
				} else {
					ticks.unshift({
						value: this.minTick,
						label: `Worst: ${this.minTick}`
					});
					ticks.push({
						value: this.maxTick,
						label: `Best: ${this.maxTick}`
					});
				}
			} else {
				ticks.splice(ticks.length / 2, 0, {
					value: this.minTick,
					label: this.minTick
				});
			}
			return ticks;
		}
	},
	methods: {
		updateValue: function (event) {
			this.$emit("input", event.target.value);
		},
		changeValue: function (event) {
			value_change = Number(event.target.value);
			label = event.target.innerText;
			if (label.startsWith("+") || label.startsWith("-")) {
				this.value = Math.max(this.value + value_change, this.minTick);
			} else {
				this.value = value_change;
			}
			this.$emit("input", this.value);
		}
	}
});

let app = new Vue({
	el: "#app",
	data: {
		wishlistSize: 7,
		wishBoost: 0,
		firstWishBoost: 0,
		wishProtection: 5000,
		disabledChars: 0,
		leftChars: 21532,
		totalChars: 21532,
		PersonalRare: 2,
		rollAmount: 10,
		wishesDesired: 1,
		f: [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800, 39916800, 479001600, 6227020800, 87178291200, 1307674368000, 20922789888000, 355687428096000, 6402373705728000, 121645100408832000, 2432902008176640000, 51090942171709440000, 1.1240007277776077e+21, 
		    2.585201673888498e+22, 6.204484017332394e+23, 1.5511210043330986e+25, 4.0329146112660565e+26, 1.0888869450418352e+28, 3.0488834461171384e+29, 8.841761993739701e+30, 2.6525285981219103e+32, 8.222838654177922e+33, 2.631308369336935e+35, 8.683317618811886e+36, 
		    2.9523279903960412e+38, 1.0333147966386144e+40, 3.719933267899012e+41, 1.3763753091226343e+43, 5.23022617466601e+44, 2.0397882081197442e+46, 8.159152832478977e+47, 3.3452526613163803e+49, 1.4050061177528798e+51, 6.041526306337383e+52, 2.6582715747884485e+54, 
		    1.1962222086548019e+56, 5.5026221598120885e+57, 2.5862324151116818e+59, 1.2413915592536073e+61, 6.082818640342675e+62, 3.0414093201713376e+64, 1.5511187532873822e+66, 8.065817517094388e+67, 4.2748832840600255e+69, 2.308436973392414e+71, 1.2696403353658276e+73, 
		    7.109985878048635e+74, 4.052691950487722e+76, 2.350561331282879e+78, 1.3868311854568986e+80, 8.320987112741392e+81, 5.075802138772248e+83, 3.146997326038794e+85, 1.98260831540444e+87, 1.2688693218588417e+89, 8.247650592082472e+90, 5.443449390774431e+92, 3.647111091818868e+94, 
		    2.4800355424368305e+96, 1.711224524281413e+98, 1.197857166996989e+100, 8.504785885678622e+101, 6.123445837688608e+103, 4.4701154615126834e+105, 3.3078854415193856e+107, 2.480914081139539e+109, 1.8854947016660498e+111, 1.4518309202828584e+113, 1.1324281178206295e+115, 
		    8.946182130782973e+116, 7.156945704626378e+118, 5.797126020747366e+120, 4.75364333701284e+122, 3.945523969720657e+124, 3.314240134565352e+126, 2.8171041143805494e+128, 2.4227095383672724e+130, 2.107757298379527e+132, 1.8548264225739836e+134, 1.6507955160908452e+136, 
		    1.4857159644817607e+138, 1.3520015276784023e+140, 1.24384140546413e+142, 1.1567725070816409e+144, 1.0873661566567424e+146, 1.0329978488239052e+148, 9.916779348709491e+149, 9.619275968248206e+151, 9.426890448883242e+153, 9.33262154439441e+155, 9.33262154439441e+157, 
		    9.425947759838354e+159, 9.614466715035121e+161, 9.902900716486175e+163, 1.0299016745145622e+166, 1.0813967582402903e+168, 1.1462805637347078e+170, 1.2265202031961373e+172, 1.3246418194518284e+174, 1.4438595832024928e+176, 1.5882455415227421e+178, 1.7629525510902437e+180, 
		    1.9745068572210728e+182, 2.2311927486598123e+184, 2.543559733472186e+186, 2.925093693493014e+188, 3.3931086844518965e+190, 3.969937160808719e+192, 4.6845258497542883e+194, 5.574585761207603e+196, 6.689502913449124e+198, 8.09429852527344e+200, 9.875044200833598e+202, 
		    1.2146304367025325e+205, 1.5061417415111404e+207, 1.8826771768889254e+209, 2.372173242880046e+211, 3.012660018457658e+213, 3.8562048236258025e+215, 4.9745042224772855e+217, 6.466855489220472e+219, 8.471580690878817e+221, 1.118248651196004e+224, 1.4872707060906852e+226, 
		    1.992942746161518e+228, 2.6904727073180495e+230, 3.659042881952547e+232, 5.01288874827499e+234, 6.917786472619486e+236, 9.615723196941086e+238, 1.346201247571752e+241, 1.89814375907617e+243, 2.6953641378881614e+245, 3.8543707171800706e+247, 5.550293832739301e+249, 
		    8.047926057471987e+251, 1.17499720439091e+254, 1.7272458904546376e+256, 2.5563239178728637e+258, 3.808922637630567e+260, 5.7133839564458505e+262, 8.627209774233235e+264, 1.3113358856834518e+267, 2.006343905095681e+269, 3.089769613847349e+271, 4.789142901463391e+273, 
		    7.47106292628289e+275, 1.1729568794264138e+278, 1.8532718694937338e+280, 2.946702272495037e+282, 4.714723635992059e+284, 7.590705053947215e+286, 1.2296942187394488e+289, 2.0044015765453015e+291, 3.2872185855342945e+293, 5.423910666131586e+295, 9.003691705778433e+297, 
		    1.5036165148649983e+300, 2.526075744973197e+302, 4.2690680090047027e+304, 7.257415615307994e+306]
	},
	
	
	
	computed: {
		Val: function () {
			return 100 * (this.wishlistSize * (1 + this.wishBoost / 100) + this.firstWishBoost / 100) / (this.leftChars - this.disabledChars + ((1 - (this.leftChars) / (this.totalChars)) ** this.PersonalRare) * this.totalChars) + (1 / this.wishProtection);
		},
		
		Prob: function () {
			let sm = 0;
			let val = (this.wishlistSize * (1 + this.wishBoost / 100) + this.firstWishBoost / 100) / (this.leftChars - this.disabledChars + ((1 - (this.leftChars) / (this.totalChars)) ** this.PersonalRare) * this.totalChars) + (1 / this.wishProtection);
			for (var x = this.rollAmount; x>=this.wishesDesired; x--) {
				sm += (this.f[this.rollAmount])/(this.f[this.rollAmount-x]*this.f[x])*(val**x)*((1-val)**(this.rollAmount-x))
			}
			return 100*sm
		}
	},
	mounted: function () {
		renderMathInElement(this.$refs.nerdShit);
		hljs.initHighlightingOnLoad();
	}
});
