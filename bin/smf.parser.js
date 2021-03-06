/** @license smfplayer.js 2013 - imaya / GREE Inc. [ https://github.com/gree/smfplayer.js ] The MIT License */
(function () {
	'use strict';
	var i = void 0, j = null, m = this;
	function n(f, c) {
		var e = f.split('.'), b = m;
		!(e[0] in b) && b.execScript && b.execScript('var ' + e[0]);
		for (var a; e.length && (a = e.shift());)
			!e.length && c !== i ? b[a] = c : b = b[a] ? b[a] : b[a] = {};
	}
	function r(f) {
		var c = s;
		function e() {
		}
		e.prototype = c.prototype;
		f.o = c.prototype;
		f.prototype = new e();
	}
	;
	var t = m.Uint8Array !== i && m.Uint16Array !== i && m.Uint32Array !== i;
	function s(f, c, e) {
		this.f = f;
		this.m = c;
		this.time = e;
	}
	function u(f, c, e, b, a, g) {
		s.call(this, f, c, e);
		this.h = b;
		this.j = a;
		this.e = g;
	}
	r(u);
	function v(f, c, e, b) {
		s.call(this, f, c, e);
		this.data = b;
	}
	r(v);
	function w(f, c, e, b) {
		s.call(this, f, c, e);
		this.data = b;
	}
	r(w);
	function A(f, c) {
		c = c || {};
		this.input = f;
		this.a = c.index || 0;
		this.length = c.length || f.length - this.a;
		this.offset = this.a;
		this.padding = c.padding !== i ? c.padding : !0;
		this.g = c.bigEndian !== i ? c.bigEndian : !1;
	}
	A.prototype.parse = function () {
		var f = this.length + this.offset;
		for (this.d = []; this.a < f;) {
			var c = this.input, e = this.a, b = i;
			this.d.push({
				type: String.fromCharCode(c[e++], c[e++], c[e++], c[e++]),
				size: b = this.g ? (c[e++] << 24 | c[e++] << 16 | c[e++] << 8 | c[e++]) >>> 0 : (c[e++] | c[e++] << 8 | c[e++] << 16 | c[e++] << 24) >>> 0,
				offset: e
			});
			e += b;
			this.padding && 1 === (e - this.offset & 1) && e++;
			this.a = e;
		}
	};
	function B(f, c) {
		var e = f.d[c];
		return e === i ? j : e;
	}
	;
	function C(f, c) {
		c = c || {};
		c.padding = !1;
		c.bigEndian = !0;
		this.input = f;
		this.a = c.index || 0;
		this.c = 0;
		this.b = new A(f, c);
		this.l = [];
		this.k = [];
	}
	C.prototype.parse = function () {
		var f, c;
		this.b.parse();
		f = B(this.b, this.c++);
		c = this.input;
		var e = f.offset;
		if (!f || 'MThd' !== f.type)
			throw Error('invalid header signature');
		this.n = c[e++] << 8 | c[e++];
		this.i = c[e++] << 8 | c[e++];
		this.p = c[e++] << 8 | c[e++];
		f = 0;
		for (c = this.i; f < c; ++f)
			F(this);
	};
	function F(f) {
		function c() {
			var c = 0, d;
			do
				d = b[a++], c = c << 7 | d & 127;
			while (0 !== (d & 128));
			return c;
		}
		var e = B(f.b, f.c++), b = f.input, a = e.offset, g, l, p, x = -1, y = -1, d, h = 0, k, q;
		if (!e || 'MTrk' !== e.type)
			throw Error('invalid header signature');
		for (var e = e.offset + e.size, D = [], E = []; a < e;) {
			g = c();
			h += g;
			k = a;
			q = b[a++];
			l = q >> 4 & 15;
			p = q & 15;
			8 > l ? (l = x, p = y, q = x << 4 | y, a--, k--) : (x = l, y = p);
			var z = [
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
			switch (l) {
			case 8:
			case 9:
			case 10:
			case 11:
			case 13:
			case 14:
				d = new u(z[l], g, h, p, b[a++], b[a++]);
				break;
			case 12:
				d = new u(z[l], g, h, p, b[a++]);
				break;
			case 15:
				switch (p) {
				case 0:
					d = c();
					if (247 !== b[a + d - 1])
						throw Error('invalid SysEx event');
					d = new v('SystemExclusive', g, h, t ? b.subarray(a, (a += d) - 1) : b.slice(a, (a += d) - 1));
					break;
				case 7:
					d = c();
					d = new v('SystemExclusive(F7)', g, h, t ? b.subarray(a, a += d) : b.slice(a, a += d));
					break;
				case 15:
					l = b[a++];
					d = c();
					switch (l) {
					case 0:
						d = new w('SequenceNumber', g, h, [
							b[a++],
							b[a++]
						]);
						break;
					case 1:
						d = new w('TextEvent', g, h, [String.fromCharCode.apply(j, t ? b.subarray(a, a += d) : b.slice(a, a += d))]);
						break;
					case 2:
						d = new w('CopyrightNotice', g, h, [String.fromCharCode.apply(j, t ? b.subarray(a, a += d) : b.slice(a, a += d))]);
						break;
					case 3:
						d = new w('SequenceTrackName', g, h, [String.fromCharCode.apply(j, t ? b.subarray(a, a += d) : b.slice(a, a += d))]);
						break;
					case 4:
						d = new w('InstrumentName', g, h, [String.fromCharCode.apply(j, t ? b.subarray(a, a += d) : b.slice(a, a += d))]);
						break;
					case 5:
						d = new w('Lyrics', g, h, [String.fromCharCode.apply(j, t ? b.subarray(a, a += d) : b.slice(a, a += d))]);
						break;
					case 6:
						d = new w('Marker', g, h, [String.fromCharCode.apply(j, t ? b.subarray(a, a += d) : b.slice(a, a += d))]);
						break;
					case 7:
						d = new w('CuePoint', g, h, [String.fromCharCode.apply(j, t ? b.subarray(a, a += d) : b.slice(a, a += d))]);
						break;
					case 32:
						d = new w('MidiChannelPrefix', g, h, [b[a++]]);
						break;
					case 47:
						d = new w('EndOfTrack', g, h, []);
						break;
					case 81:
						d = new w('SetTempo', g, h, [b[a++] << 16 | b[a++] << 8 | b[a++]]);
						break;
					case 84:
						d = new w('SmpteOffset', g, h, [
							b[a++],
							b[a++],
							b[a++],
							b[a++],
							b[a++]
						]);
						break;
					case 88:
						d = new w('TimeSignature', g, h, [
							b[a++],
							b[a++],
							b[a++],
							b[a++]
						]);
						break;
					case 89:
						d = new w('KeySignature', g, h, [
							b[a++],
							b[a++]
						]);
						break;
					case 127:
						d = new w('SequencerSpecific', g, h, [t ? b.subarray(a, a += d) : b.slice(a, a += d)]);
						break;
					default:
						d = new w('Unknown', g, h, [
							l,
							t ? b.subarray(a, a += d) : b.slice(a, a += d)
						]);
					}
					break;
				default:
					m.console.log('unknown message:', q.toString(16));
				}
				break;
			default:
				throw Error('invalid status');
			}
			g = a - k;
			k = t ? b.subarray(k, k + g) : b.slice(k, k + g);
			k[0] = q;
			d instanceof u && ('NoteOn' === d.f && 0 === d.e) && (d.f = z[8], k = [
				128 | d.h,
				d.j,
				d.e
			], t && (k = new Uint8Array(k)));
			E.push(k);
			D.push(d);
		}
		f.l.push(D);
		f.k.push(E);
	}
	;
	n('SMF.Parser', C);
	n('SMF.Parser.prototype.parse', C.prototype.parse);
}.call(this));	//@ sourceMappingURL=smf.parser.min.js.map
