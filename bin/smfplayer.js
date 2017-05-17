(e, f[h]);
			j = e.length;
			h = [
				77,
				84,
				114,
				107,
				j >> 24 & 255,
				j >> 16 & 255,
				j >> 8 & 255,
				j & 255
			];
			d = d.concat(h, e);
		}
		A && (d = new Uint8Array(d));
		return d;
	}
	function H(b, a) {
		var d = [
			0,
			12,
			-24,
			-12
		];
		if (d[a] !== p)
			return b + d[a];
		n(Error('invalid OctaveShift value:' + a));
	}
	function I(b) {
		for (var a = []; 128 <= b;)
			a.unshift(b & 127 | (0 === a.length ? 0 : 128)), b >>>= 7;
		a.unshift(b | (0 === a.length ? 0 : 128));
		return a;
	}
	;
	function K(b, a) {
		a = a || {};
		this.input = b;
		this.a = a.index || 0;
		this.length = a.length || b.length - this.a;
		this.offset = this.a;
		this.padding = a.padding !== p ? a.padding : !0;
		this.G = a.bigEndian !== p ? a.bigEndian : s;
	}
	K.prototype.parse = function () {
		var b = this.length + this.offset;
		for (this.n = []; this.a < b;) {
			var a = this.input, d = this.a, e = p;
			this.n.push({
				type: String.fromCharCode(a[d++], a[d++], a[d++], a[d++]),
				size: e = this.G ? (a[d++] << 24 | a[d++] << 16 | a[d++] << 8 | a[d++]) >>> 0 : (a[d++] | a[d++] << 8 | a[d++] << 16 | a[d++] << 24) >>> 0,
				offset: d
			});
			d += e;
			this.padding && 1 === (d - this.offset & 1) && d++;
			this.a = d;
		}
	};
	function L(b, a) {
		var d = b.n[a];
		return d === p ? q : d;
	}
	;
	function M(b, a) {
		a = a || {};
		a.padding = s;
		a.bigEndian = !0;
		this.input = b;
		this.a = a.index || 0;
		this.m = 0;
		this.l = new K(b, a);
		this.i = [];
		this.A = [];
	}
	M.prototype.parse = function () {
		var b, a;
		this.l.parse();
		b = L(this.l, this.m++);
		a = this.input;
		var d = b.offset;
		(!b || 'MThd' !== b.type) && n(Error('invalid header signature'));
		this.I = a[d++] << 8 | a[d++];
		this.k = a[d++] << 8 | a[d++];
		this.T = a[d++] << 8 | a[d++];
		b = 0;
		for (a = this.k; b < a; ++b)
			N(this);
	};
	function N(b) {
		function a() {
			var a = 0, b;
			do
				b = e[c++], a = a << 7 | b & 127;
			while (0 !== (b & 128));
			return a;
		}
		var d = L(b.l, b.m++), e = b.input, c = d.offset, g, i, h, j = -1, l = -1, f, k = 0, m, y;
		(!d || 'MTrk' !== d.type) && n(Error('invalid header signature'));
		for (var d = d.offset + d.size, r = [], J = []; c < d;) {
			g = a();
			k += g;
			m = c;
			y = e[c++];
			i = y >> 4 & 15;
			h = y & 15;
			8 > i ? (i = j, h = l, y = j << 4 | l, c--, m--) : (j = i, l = h);
			var G = [
				,
				,
				,
				,
				,
				,
				,
				,
				'NoteOff',
				'NoteOn',
				'NoteAftertouch',
				'ControlChange',
				'ProgramChange',
				'ChannelAftertouch',
				'PitchBend'
			];
			switch (i) {
			case 8:
			case 9:
			case 10:
			case 11:
			case 13:
			case 14:
				f = new B(G[i], g, k, h, e[c++], e[c++]);
				break;
			case 12:
				f = new B(G[i], g, k, h, e[c++]);
				break;
			case 15:
				switch (h) {
				case 0:
					f = a();
					247 !== e[c + f - 1] && n(Error('invalid SysEx event'));
					f = new C('SystemExclusive', g, k, A ? e.subarray(c, (c += f) - 1) : e.slice(c, (c += f) - 1));
					break;
				case 7:
					f = a();
					f = new C('SystemExclusive(F7)', g, k, A ? e.subarray(c, c += f) : e.slice(c, c += f));
					break;
				case 15:
					i = e[c++];
					f = a();
					switch (i) {
					case 0:
						f = new D('SequenceNumber', g, k, [
							e[c++],
							e[c++]
						]);
						break;
					case 1:
						f = new D('TextEvent', g, k, [String.fromCharCode.apply(q, A ? e.subarray(c, c += f) : e.slice(c, c += f))]);
						break;
					case 2:
						f = new D('CopyrightNotice', g, k, [String.fromCharCode.apply(q, A ? e.subarray(c, c += f) : e.slice(c, c += f))]);
						break;
					case 3:
						f = new D('SequenceTrackName', g, k, [String.fromCharCode.apply(q, A ? e.subarray(c, c += f) : e.slice(c, c += f))]);
						break;
					case 4:
						f = new D('InstrumentName', g, k, [String.fromCharCode.apply(q, A ? e.subarray(c, c += f) : e.slice(c, c += f))]);
						break;
					case 5:
						f = new D('Lyrics', g, k, [String.fromCharCode.apply(q, A ? e.subarray(c, c += f) : e.slice(c, c += f))]);
						break;
					case 6:
						f = new D('Marker', g, k, [String.fromCharCode.apply(q, A ? e.subarray(c, c += f) : e.slice(c, c += f))]);
						break;
					case 7:
						f = new D('CuePoint', g, k, [String.fromCharCode.apply(q, A ? e.subarray(c, c += f) : e.slice(c, c += f))]);
						break;
					case 32:
						f = new D('MidiChannelPrefix', g, k, [e[c++]]);
						break;
					case 47:
						f = new D('EndOfTrack', g, k, []);
						break;
					case 81:
						f = new D('SetTempo', g, k, [e[c++] << 16 | e[c++] << 8 | e[c++]]);
						break;
					case 84:
						f = new D('SmpteOffset', g, k, [
							e[c++],
							e[c++],
							e[c++],
							e[c++],
							e[c++]
						]);
						break;
					case 88:
						f = new D('TimeSignature', g, k, [
							e[c++],
							e[c++],
							e[c++],
							e[c++]
						]);
						break;
					case 89:
						f = new D('KeySignature', g, k, [
							e[c++],
							e[c++]
						]);
						break;
					case 127:
						f = new D('SequencerSpecific', g, k, [A ? e.subarray(c, c += f) : e.slice(c, c += f)]);
						break;
					default:
						f = new D('Unknown', g, k, [
							i,
							A ? e.subarray(c, c += f) : e.slice(c, c += f)
						]);
					}
					break;
				default:
					v.console.log('unknown message:', y.toString(16));
				}
				break;
			default:
				n(Error('invalid status'));
			}
			g = c - m;
			m = A ? e.subarray(m, m + g) : e.slice(m, m + g);
			m[0] = y;
			f instanceof B && ('NoteOn' === f.c && 0 === f.z) && (f.c = G[8], m = [
				128 | f.H,
				f.w,
				f.z
			], A && (m = new Uint8Array(m)));
			J.push(m);
			r.push(f);
		}
		b.i.push(r);
		b.A.push(J);
	}
	;
	function O() {
		this.f = 500000;
		this.h = s;
		this.position = 0;
		this.r = this.s = this.q = this.p = s;
		this.F = 1;
		this.v = 16383;
	}
	u = O.prototype;
	u.N = t('p');
	u.O = t('q');
	u.Q = t('s');
	u.P = t('r');
	u.stop = function () {
		var b, a;
		this.pause = !0;
		this.e = Date.now();
		if (this.b) {
			b = this.b.contentWindow;
			for (a = 0; 16 > a; ++a)
				b.postMessage('midi,b' + a.toString(16) + ',78,0', '*');
		}
	};
	u.L = function () {
		return this.b;
	};
	function P(b) {
		b.stop();
		b.f = 500000;
		b.position = 0;
		b.pause = s;
		b.g = q;
		b.e = -1;
		b.B = q;
		b.C = q;
		b.o = q;
		clearTimeout(b.d);
		b.h ? Q(b) : window.addEventListener('message', function (a) {
			'link,ready' === a.data && Q(b);
		}, s);
	}
	u.play = function () {
		var b = this;
		this.b || n(Error('WebMidiLink not found'));
		this.h ? (this.g instanceof Array && this.position >= this.g.length && (this.position = 0), R(this)) : window.addEventListener('message', function (a) {
			'link,ready' === a.data && (b.h = !0, R(b));
		}, s);
	};
	function Q(b) {
		b = b.b.contentWindow;
		var a;
		for (a = 0; 16 > a; ++a)
			b.postMessage('midi,b' + a.toString(16) + ',07,64', '*'), b.postMessage('midi,b' + a.toString(16) + ',0a,40', '*'), b.postMessage('midi,e' + a.toString(16) + ',00,40', '*'), b.postMessage('midi,b' + a.toString(16) + ',64,00', '*'), b.postMessage('midi,b' + a.toString(16) + ',65,00', '*'), b.postMessage('midi,b' + a.toString(16) + ',06,02', '*'), b.postMessage('midi,b' + a.toString(16) + ',26,00', '*');
	}
	u.S = function (b) {
		var a = this, d;
		this.b && (document.body.removeChild(this.b), this.b = q);
		d = this.b = document.createElement('iframe');
		d.src = b || 'http://www.g200kg.com/en/docs/gmplayer/';
		document.body.appendChild(d);
		window.addEventListener('message', function (b) {
			'link,ready' === b.data && (a.h = !0, a.D(a.v));
		}, s);
	};
	u.D = function (b) {
		var a;
		this.v = b;
		this.b && (a = this.b.contentWindow, a.postMessage('midi,f0,7f,7f,04,01,' + [
			('0' + (b & 127).toString(16)).substr(-2),
			('0' + (b >> 7 & 127).toString(16)).substr(-2),
			'7f'
		].join(), '*'));
	};
	u.R = t('F');
	function R(b) {
		function a() {
			var b = c[i].time, l = c.length, f, k, m = Date.now();
			if (d.pause)
				d.e = Date.now() - d.e;
			else {
				do {
					f = c[i].event;
					'SetTempo' === f.c && (d.f = f.data[0]);
					'ControlChange' === f.c && 111 === f.w && (h[0] = { pos: i });
					if ('Marker' === f.c && ('A' === f.data[0] && (h[0] = { pos: i }), 'B' === f.data[0] && d.q && h[0] && 'number' === typeof h[0].pos)) {
						i = h[0].pos;
						d.d = setTimeout(a, 0);
						d.position = i;
						return;
					}
					if ('Marker' === f.c && (f = f.data[0].match(/^LOOP_(START|END)=ID:(\d+),COUNT:(-?\d+)$/)))
						if ('START' === f[1])
							h[f[2] | 0] = h[f[2]] || {
								pos: i,
								count: f[3] | 0
							};
						else if ('END' === f[1] && d.s) {
							k = h[f[2] | 0];
							if (0 !== k.count) {
								0 < k.count && k.count--;
								i = k.pos;
								d.d = setTimeout(a, 0);
								d.position = i;
								return;
							}
							h[f[2] | 0] = q;
						}
					g.postMessage(c[i++].webMidiLink, '*');
				} while (i < l && c[i].time === b);
				i < l ? (m = Date.now() - m, d.d = setTimeout(a, d.f / (1000 * e) * (c[i].time - b - m) * (1 / d.F))) : d.p && h[0] && 'number' === typeof h[0].pos ? (i = h[0].pos, d.d = setTimeout(a, 0)) : d.r && (b = d, b.f = 500000, b.position = 0, R(d));
				d.position = i;
			}
		}
		var d = b, e = b.B.T, c = b.g, g = b.b.contentWindow, i = b.position || 0, h = [];
		b.pause ? (b.d = setTimeout(a, b.e), b.pause = s, b.e = -1) : b.d = setTimeout(a, b.f / 1000 * e * b.g[0].time);
	}
	u.u = function (b) {
		b = new M(b);
		P(this);
		b.parse();
		var a = this.g = [], d, e, c, g = this.o = [], i, h, j, l;
		e = b.i;
		d = Array(e.length);
		c = b.A;
		i = 0;
		for (h = e.length; i < h; ++i)
			d[i] = 0;
		i = 0;
		for (h = e.length; i < h; ++i) {
			d = e[i];
			j = 0;
			for (l = d.length; j < l; ++j)
				0 === b.I && 'SequenceTrackName' === d[j].c && (this.C = d[j].data[0]), 'CopyrightNotice' === d[j].c && g.push(d[j].data[0]), a.push({
					track: i,
					eventId: j,
					time: d[j].time,
					event: d[j],
					webMidiLink: 'midi,' + Array.prototype.map.call(c[i][j], function (a) {
						return a.toString(16);
					}).join(',')
				});
		}
		a.sort(function (a, b) {
			return a.time > b.time ? 1 : a.time < b.time ? -1 : a.track > b.track ? 1 : a.track < b.track ? -1 : a.eventId > b.eventId ? 1 : a.eventId < b.eventId ? -1 : 0;
		});
		this.B = b;
	};
	u.M = function (b) {
		b = new E(b);
		P(this);
		b.parse();
		this.u(F(b));
	};
	u.K = function () {
		return this.C;
	};
	u.J = function () {
		return this.o;
	};
	w('SMF.Player', O);
	w('SMF.Player.prototype.play', O.prototype.play);
	w('SMF.Player.prototype.stop', O.prototype.stop);
	w('SMF.Player.prototype.loadMidiFile', O.prototype.u);
	w('SMF.Player.prototype.loadMldFile', O.prototype.M);
	w('SMF.Player.prototype.setLoop', O.prototype.P);
	w('SMF.Player.prototype.setCC111Loop', O.prototype.N);
	w('SMF.Player.prototype.setFalcomLoop', O.prototype.O);
	w('SMF.Player.prototype.setMFiLoop', O.prototype.Q);
	w('SMF.Player.prototype.setWebMidiLink', O.prototype.S);
	w('SMF.Player.prototype.getWebMidiLink', O.prototype.L);
	w('SMF.Player.prototype.setTempoRate', O.prototype.R);
	w('SMF.Player.prototype.setMasterVolume', O.prototype.D);
	w('SMF.Player.prototype.getCopyright', O.prototype.J);
	w('SMF.Player.prototype.getSequenceName', O.prototype.K);
}.call(this));	//@ sourceMappingURL=smfplayer.min.js.map
