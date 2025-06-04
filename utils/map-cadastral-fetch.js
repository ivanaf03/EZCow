import { XMLParser } from "fast-xml-parser";

// XML example
/*
<FeatureCollection xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:gml="http://www.opengis.net/gml/3.2" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:cp="http://inspire.ec.europa.eu/schemas/cp/4.0" xmlns:gmd="http://www.isotc211.org/2005/gmd" xmlns="http://www.opengis.net/wfs/2.0" xsi:schemaLocation="http://www.opengis.net/wfs/2.0 http://schemas.opengis.net/wfs/2.0/wfs.xsd http://inspire.ec.europa.eu/schemas/cp/4.0 http://inspire.ec.europa.eu/schemas/cp/4.0/CadastralParcels.xsd" timeStamp="2025-05-20T17:34:00" numberMatched="1" numberReturned="1">
<member>
<cp:CadastralParcel gml:id="ES.SDGC.CP.27018A02100015">
<cp:areaValue uom="m2">7140</cp:areaValue>
<cp:beginLifespanVersion>2011-03-23T00:00:00</cp:beginLifespanVersion>
<cp:endLifespanVersion xsi:nil="true" nilReason="http://inspire.ec.europa.eu/codelist/VoidReasonValue/Unpopulated"/>
<cp:geometry>
<gml:MultiSurface gml:id="MultiSurface_ES.SDGC.CP.27018A02100015" srsName="http://www.opengis.net/def/crs/EPSG/0/25830">
<gml:surfaceMember>
<gml:Surface gml:id="Surface_ES.SDGC.CP.27018A02100015.1" srsName="http://www.opengis.net/def/crs/EPSG/0/25830">
<gml:patches>
<gml:PolygonPatch>
<gml:exterior>
<gml:LinearRing>
<gml:posList srsDimension="2" count="28">162070.81 4795525.35 162071.2 4795526.64 162073.26 4795533.33 162074.99 4795538.97 162079.48 4795547.47 162087.24 4795560.3 162091.77 4795566.22 162096.42 4795569.58 162116.86 4795582.82 162131.88 4795590.73 162160.49 4795575.17 162164.9 4795571.72 162182.37 4795557.42 162188.52 4795551.85 162180.12 4795544.61 162173.84 4795536.29 162164.43 4795524.7 162142.85 4795502.11 162133.82 4795501.56 162122.48 4795500.88 162116.68 4795494.26 162097.16 4795485.67 162092.02 4795510.92 162081.95 4795516.52 162077.57 4795502.69 162067.34 4795506.73 162069.53 4795521.18 162070.81 4795525.35</gml:posList>
</gml:LinearRing>
</gml:exterior>
</gml:PolygonPatch>
</gml:patches>
</gml:Surface>
</gml:surfaceMember>
</gml:MultiSurface>
</cp:geometry>
<cp:inspireId>
<Identifier xmlns="http://inspire.ec.europa.eu/schemas/base/3.3">
<localId>27018A02100015</localId>
<namespace>ES.SDGC.CP</namespace>
</Identifier>
</cp:inspireId>
<cp:label>00015</cp:label>
<cp:nationalCadastralReference>27018A02100015</cp:nationalCadastralReference>
<cp:referencePoint>
<gml:Point gml:id="ReferencePoint_ES.SDGC.CP.27018A02100015" srsName="http://www.opengis.net/def/crs/EPSG/0/25830">
<gml:pos>162124.53 4795540</gml:pos>
</gml:Point>
</cp:referencePoint>
</cp:CadastralParcel>
</member>
</FeatureCollection>
*/

export const fetchCadastral = async (cadastralReference) => {
  const URL = `https://ovc.catastro.meh.es/INSPIRE/wfsCP.aspx?service=wfs&version=2&request=getfeature&STOREDQUERIE_ID=GetParcel&refcat=${cadastralReference}&srsname=EPSG:4326`;

  const response = await fetch(URL);

  const xml = await response.text();
  const parser = new XMLParser();
  const parsed = parser.parse(xml);

  const cadastralParcel = parsed.FeatureCollection.member["cp:CadastralParcel"];

  const posList =
    cadastralParcel["cp:geometry"]["gml:MultiSurface"]["gml:surfaceMember"][
      "gml:Surface"
    ]["gml:patches"]["gml:PolygonPatch"]["gml:exterior"]["gml:LinearRing"][
      "gml:posList"
    ];

  const coordsArray = posList.trim().split(/\s+/);

  const polygonCoords = [];
  for (let i = 0; i < coordsArray.length; i += 2) {
    polygonCoords.push({
      latitude: parseFloat(coordsArray[i]), 
      longitude: parseFloat(coordsArray[i + 1]),
    });
  }

  return polygonCoords;
};

