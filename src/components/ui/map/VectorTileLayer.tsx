import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.vectorgrid";
import { layerStyles } from './VectorTileLayerStyles';
import FeaturePopup from './FeaturePopup';

type Props = {
    url: string;
    zIndex?: number;
    visible?: boolean;
    layerName?: string;
    onHighlight?: (features: Array<{ geometry: any, layer: string }> | null) => void;
};

function patchVectorGridLayer(obj: any) {
    // Fix error for point data.
    // eg. mouseover does not work without this.
    obj._createLayer_orig = obj._createLayer;
    obj._createLayer = function (feat: any, pxPerExtent: any, layerStyle: any) {
        const layer = this._createLayer_orig(feat, pxPerExtent, layerStyle);
        if (feat.type === 1) {
            layer.getLatLng = null;
        }
        return layer;
    };
    // do this for chaining
    return obj;
}

export const VectorTileLayer: React.FC<Props> = ({ url, zIndex = 1000, visible = true, layerName, onHighlight }) => {
    const map = useMap();
    const [popupData, setPopupData] = useState<null | { latlng: L.LatLng, properties: any, layerName: string }>(null);

    useEffect(() => {
        if (!visible) return;

        const vtStyle = layerName && layerStyles[layerName as keyof typeof layerStyles] ? { [layerName]: layerStyles[layerName as keyof typeof layerStyles] } : {};

        // Create VectorGrid layer as Protobuf
        const vtLayer =
            patchVectorGridLayer(
                (L as any).vectorGrid.protobuf(url, {
                zIndex,
                // vectorTileLayerStyles: {
                //     // update for layers - example for simple styling
                //     ...(layerName && {
                //         [layerName]: {
                //             weight: 2,
                //             color: "#1669bc",
                //             fill: true,
                //             fillColor: "#31abee",
                //             fillOpacity: 0.2,
                //         }
                //     })
                // },
                vectorTileLayerStyles: vtStyle,
                interactive: true,
                tms: true,
                maxNativeZoom: 25,
                maxZoom: 25
            }).on('click', function(e: any) {
                const feature = e.layer;

                // Show popup for this feature only
                setPopupData({
                    latlng: e.latlng,
                    properties: feature.properties,
                    layerName: layerName || '',
                });
            })
        );

        vtLayer.addTo(map);

        return () => {
            vtLayer.remove();
        };
    }, [url, visible, zIndex, layerName, map]);

    // Render popup if needed
    return (
        <>
            {/* Vector tile layer is not a React component, it's handled by side-effect */}
            {popupData && (
                <FeaturePopup
                    position={popupData.latlng}
                    properties={popupData.properties}
                    layerName={popupData.layerName}
                    onClose={() => setPopupData(null)}
                    onHighlight={onHighlight}
                />
            )}
        </>
    );
};