var f = [1, 1];
var i = 2;
function factorial(n)
{
  if (typeof f[n] != 'undefined')
    return f[n];
  var result = f[i-1];
  for (; i <= n; i++)
      f[i] = result = result*i;
  return result;
}
var cache = 100;
// Due to memoization, following line will cache first 100 elements.
factorial(cache);

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
		sm: 0,
		val: 0
	},
	computed: {
		Val: function () {
			return 100 * (this.wishlistSize * (1 + this.wishBoost / 100) + this.firstWishBoost / 100) / (this.leftChars - this.disabledChars + ((1 - (this.leftChars) / (this.totalChars)) ** this.PersonalRare) * this.totalChars) + (1 / this.wishProtection);
		},
		Prob: function () {
			this.sm = 0;
			this.val = (this.wishlistSize * (1 + this.wishBoost / 100) + this.firstWishBoost / 100) / (this.leftChars - this.disabledChars + ((1 - (this.leftChars) / (this.totalChars)) ** this.PersonalRare) * this.totalChars) + (1 / this.wishProtection);
			for (var x = this.rollAmount; x>=this.wishesDesired; x--) {
				this.sm += (f[this.rollAmount])/(f[this.rollAmount-x]*f[x])*(Math.pow((this.val, x))*(Math.pow(this.val, (this.rollAmount-x)))
			}
			return this.sm
		}
	},
	mounted: function () {
		renderMathInElement(this.$refs.nerdShit);
		hljs.initHighlightingOnLoad();
	}
});
