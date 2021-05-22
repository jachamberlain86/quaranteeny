import blank from './blank.png';
import { bathImgs } from './bathroom/index';
import { bedImgs } from './bedroom/index';
import { diningImgs } from './diningRoom/index';
import { doorImgs } from './doors/index';
import { floorImgs } from './floor/index';
import { kitchenImgs } from './kitchen/index';
import { livingImgs } from './livingRoom/index';
import { officeImgs } from './office/index';
import { wallImgs } from './walls/index';

export class ImageDirectory {
  [key: string]: string;

  constructor() {
    this.blk = blank;
    this.rtl = wallImgs.rimTL;
    this.rt = wallImgs.rimT;
    this.rtr = wallImgs.rimTR;
    this.rl = wallImgs.rimL;
    this.rr = wallImgs.rimR;
    this.rbl = wallImgs.rimBL;
    this.rb = wallImgs.rimB;
    this.rbr = wallImgs.rimBR;
    this.wtl = wallImgs.wallTL;
    this.wt = wallImgs.wallT;
    this.wtr = wallImgs.wallTR;
    this.wl = wallImgs.wallL;
    this.wm = wallImgs.wallM;
    this.wr = wallImgs.wallR;
    this.wbl = wallImgs.wallBL;
    this.wb = wallImgs.wallB;
    this.wbr = wallImgs.wallBR;
    this.dtc = wallImgs.wallDoorTC;
    this.dtrc = wallImgs.wallDoorTRC;
    this.dbrc = wallImgs.wallDoorBRC;
    this.dtt = wallImgs.wallDoorTT;
    this.dtrt = wallImgs.wallDoorTRT;
    this.dbrt = wallImgs.wallDoorBRT;

    this.dttrans = wallImgs.wallDoorTTrans;

    this.ctl = floorImgs.carpetTL;
    this.ct = floorImgs.carpetT;
    this.ctr = floorImgs.carpetTR;
    this.cl = floorImgs.carpetL;
    this.cm = floorImgs.carpetM;
    this.cr = floorImgs.carpetR;
    this.cdr = floorImgs.carpetDoorR;
    this.ti = floorImgs.tile;

    this.babblo = bathImgs.bathOBL;
    this.babbro = bathImgs.bathOBR;
    this.babbo = bathImgs.bathOB;
    this.bablo = bathImgs.bathOL;
    this.babmo = bathImgs.bathOM;
    this.babro = bathImgs.bathOR;
    this.babtlo = bathImgs.bathOTL;
    this.babtro = bathImgs.bathOTR;
    this.babto = bathImgs.bathOT;

    this.batt = bathImgs.toiletT;
    this.batb = bathImgs.toiletB;

    this.basbc = bathImgs.sinkBC;
    this.basm = bathImgs.sinkM;
    this.bast = bathImgs.sinkT;

    this.badl = bathImgs.ducksL;
    this.badm = bathImgs.ducksM;
    this.badr = bathImgs.ducksR;

    this.bebbl = bedImgs.bedBL;
    this.bebbr = bedImgs.bedBR;
    this.bebl = bedImgs.bedL;
    this.bebr = bedImgs.bedR;
    this.bebtl = bedImgs.bedTL;
    this.bebtr = bedImgs.bedTR;

    this.bedblc = bedImgs.dresserBLC;
    this.bedbrc = bedImgs.dresserBRC;
    this.bedtl = bedImgs.dresserTL;
    this.bedtr = bedImgs.dresserTR;

    this.bepb = bedImgs.posterB;
    this.bept = bedImgs.posterT;

    this.dic = diningImgs.chair;

    this.ditl = diningImgs.tableL;
    this.ditr = diningImgs.tableR;

    this.dip = diningImgs.phone;

    this.diel = diningImgs.exerciseL;
    this.dier = diningImgs.exerciseR;

    this.doblc = doorImgs.doorBLC;
    this.dobrc = doorImgs.doorBRC;
    this.dobc = doorImgs.doorBC;
    this.dolc = doorImgs.doorLC;
    this.domc = doorImgs.doorMC;
    this.dorc = doorImgs.doorRC;
    this.dotlc = doorImgs.doorTLC;
    this.dotrc = doorImgs.doorTRC;
    this.dotc = doorImgs.doorTC;
    this.doblo = doorImgs.doorBLO;
    this.dobro = doorImgs.doorBRO;
    this.dobo = doorImgs.doorBO;
    this.dolo = doorImgs.doorLO;
    this.domo = doorImgs.doorMO;
    this.doro = doorImgs.doorRO;
    this.dotlo = doorImgs.doorTLO;
    this.dotro = doorImgs.doorTRO;
    this.doto = doorImgs.doorTO;

    this.kifb = kitchenImgs.fridgeB;
    this.kifmc = kitchenImgs.fridgeMC;
    this.kift = kitchenImgs.fridgeT;

    this.kic1bc = kitchenImgs.cab1BC;
    this.kic1t = kitchenImgs.cab1T;
    this.kic2bc = kitchenImgs.cab2BC;
    this.kic2t = kitchenImgs.cab2T;
    this.kisbc = kitchenImgs.sinkBC;
    this.kist = kitchenImgs.sinkT;
    this.kiob = kitchenImgs.ovenB;
    this.kiotoff = kitchenImgs.ovenTOff;
    this.kiu = kitchenImgs.utensils;

    this.lrbcb = livingImgs.bookcaseB;
    this.lrbcm = livingImgs.bookcaseM;
    this.lrbct = livingImgs.bookcaseT;

    this.lrjb = livingImgs.jukeboxB;
    this.lrjt = livingImgs.jukeboxT;

    this.lrlbl = livingImgs.lampBL;
    this.lrlbr = livingImgs.lampBR;
    this.lrltl = livingImgs.lampTL;
    this.lrltr = livingImgs.lampTR;

    this.lrpab = livingImgs.plantAB;
    this.lrpat = livingImgs.plantAT;

    this.lrsl = livingImgs.sofaL;
    this.lrsr = livingImgs.sofaR;

    this.lrlst = livingImgs.leftSpkrT;
    this.lrlsb = livingImgs.leftSpkrB;
    this.lrrst = livingImgs.rightSpkrT;
    this.lrrsb = livingImgs.rightSpkrB;

    this.lrtvbl = livingImgs.tvBL;
    this.lrtvbr = livingImgs.tvBR;
    this.lrtvtloff = livingImgs.tvTLOff;
    this.lrtvtroff = livingImgs.tvTROff;

    this.ofcl = officeImgs.clock;
    this.ofc = officeImgs.chair;
    this.ofb = officeImgs.bin;
    this.ofdbloff = officeImgs.deskBLOff;
    this.ofdbroff = officeImgs.deskBROff;
    this.ofdtloff = officeImgs.deskTLOff;
    this.ofdtroff = officeImgs.deskTROff;
  }
}

export const imageDirectory = new ImageDirectory();
