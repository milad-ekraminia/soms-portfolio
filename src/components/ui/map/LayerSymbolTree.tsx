import React, {useEffect, useState} from "react";
import { type Layer, type TileBaseLayer } from "./types";
import L from "leaflet";

type Props = {
    baseLayers: TileBaseLayer[];
    baseLayerId: string;
    onBaseLayerChange: (id: string) => void;
    layers: Layer[];
    onToggle: (name: string) => void;
};

export const LayerSymbolTree: React.FC<Props> = ({
                                                     baseLayers,
                                                     baseLayerId,
                                                     onBaseLayerChange,
                                                     layers,
                                                     onToggle,
                                                 }) => {
    const [open, setOpen] = useState(true);

    useEffect(() => {
        const div = L.DomUtil.get('layer-symbol-tree-root');
        if (div) {
            L.DomEvent.on(div, 'mousewheel', L.DomEvent.stopPropagation);
            L.DomEvent.on(div, 'wheel', L.DomEvent.stopPropagation);
            L.DomEvent.on(div, 'mousedown', L.DomEvent.stopPropagation);
            //L.DomEvent.on(div, 'click', L.DomEvent.stopPropagation);
            L.DomEvent.on(div, 'dblclick', L.DomEvent.stopPropagation);
        }
    }, [open]);

    return (
        <div
            id="layer-symbol-tree-root"
            style={{
                position: "absolute",
                top: 24,
                right: 24,
                background: "rgba(255,255,255,0.98)",
                borderRadius: 12,
                zIndex: 1100,
                minWidth: 300,
                boxShadow: "0 4px 24px 0 rgba(0,0,0,.16), 0 1.5px 8px 0 rgba(0,0,0,.12)",
                fontFamily:
                    '"Segoe UI", "Roboto", "Helvetica Neue", Arial, "Liberation Sans", sans-serif',
                color: "#222",
                border: "1px solid #e5e8ef",
                userSelect: "none",
                overflow: "visible",
            }}
        >
            {/* Header */}
            <button
                onClick={() => setOpen((v) => !v)}
                style={{
                    width: "100%",
                    border: "none",
                    padding: 0,
                    background: "none",
                    boxShadow: "none",
                    outline: "none",
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: 18,
                    paddingLeft: 20,
                    paddingRight: 10,
                    paddingTop: 14,
                    paddingBottom: 14,
                    letterSpacing: "0.01em",
                    justifyContent: "space-between"
                }}
                aria-expanded={open}
                aria-label={open ? "Collapse layer panel" : "Expand layer panel"}
            >
                <span style={{ letterSpacing: "0.04em" }}>🗺️ Layers</span>
                <svg
                    width={22}
                    height={22}
                    viewBox="0 0 20 20"
                    fill="none"
                    style={{
                        transform: open ? "rotate(90deg)" : "rotate(0deg)",
                        transition: "transform 0.25s cubic-bezier(0.7,1.7,0.5,0.9)",
                        marginLeft: 4,
                    }}
                    aria-hidden
                >
                    <path
                        d="M8 5l5 5-5 5"
                        stroke="#60636c"
                        strokeWidth={2.2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                    />
                </svg>
            </button>
            <div
                style={{
                    height: open ? "auto" : 0,
                    transition: "height 0.37s cubic-bezier(0.77,0,0.18,1)",
                    overflow: open ? "auto" : "hidden",
                    borderBottomLeftRadius: 12,
                    borderBottomRightRadius: 12,
                    boxShadow: open ? "inset 0px 1px 0px 0px #e3e7f4" : undefined,
                    background: open ? "#fafbfc" : "transparent"
                }}
            >
                {/* ----- TILE LAYERS (BASE MAPS) ----- */}
                <div
                    style={{
                        padding: "8px 6px 2px 14px",
                        borderBottom: "1px solid #ecedfb",
                        marginBottom: 6,
                        color: "#555",
                        fontWeight: 600,
                        fontSize: 15.2,
                    }}
                >
                    Base Layers
                </div>
                <ul
                    style={{
                        listStyle: "none",
                        margin: 0,
                        paddingLeft: 4,
                        paddingRight: 0,
                        paddingBottom: 5,
                    }}
                >
                    {/* Option to disable basemap */}
                    <li
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: 5,
                            marginLeft: 0,
                            paddingLeft: 16,
                            borderRadius: 7,
                            transition: "background 0.14s",
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = "#f3f6fa")}
                        onMouseLeave={e => (e.currentTarget.style.background = "")}
                    >
                        <input
                            type="radio"
                            name="__basemap"
                            checked={!baseLayerId}
                            id="basemap-radio-none"
                            onChange={() => onBaseLayerChange('')}
                            style={{
                                width: 17,
                                height: 17,
                                marginRight: 8,
                                cursor: "pointer",
                                accentColor: "#3a6df0",
                            }}
                        />
                        <label
                            htmlFor="basemap-radio-none"
                            style={{
                                fontSize: 15.4,
                                cursor: "pointer",
                                color: !baseLayerId ? "#234085" : "#6a7bb6",
                                fontWeight: !baseLayerId ? 600 : 400,
                                lineHeight: 1.1,
                                letterSpacing: "0.02em"
                            }}
                        >
                            No base map
                        </label>
                    </li>
                    {baseLayers.map((bl) => (
                        <li
                            key={bl.id}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: 5,
                                marginLeft: 0,
                                paddingLeft: 16,
                                borderRadius: 7,
                                transition: "background 0.14s",
                            }}
                            onMouseEnter={e => (e.currentTarget.style.background = "#f3f6fa")}
                            onMouseLeave={e => (e.currentTarget.style.background = "")}
                        >
                            <input
                                type="radio"
                                name="__basemap"
                                checked={baseLayerId === bl.id}
                                id={`basemap-radio-${bl.id}`}
                                onChange={() => onBaseLayerChange(bl.id)}
                                style={{
                                    width: 17,
                                    height: 17,
                                    marginRight: 8,
                                    cursor: "pointer",
                                    accentColor: "#3a6df0",
                                }}
                            />
                            {bl.previewUrl && (
                                <img
                                    src={bl.previewUrl}
                                    alt="base layer preview"
                                    style={{
                                        width: 38,
                                        height: 26,
                                        borderRadius: 4,
                                        boxShadow: "0 1px 2px #cad3f177",
                                        margin: "0 12px 0 12px",
                                        objectFit: "cover",
                                        border: "1px solid #e3e7f4"
                                    }}
                                />
                            )}
                            <label
                                htmlFor={`basemap-radio-${bl.id}`}
                                style={{
                                    fontSize: 15.4,
                                    cursor: "pointer",
                                    color: baseLayerId === bl.id ? "#234085" : "#6a7bb6",
                                    fontWeight: baseLayerId === bl.id ? 600 : 400,
                                    lineHeight: 1.1,
                                    letterSpacing: "0.02em"
                                }}
                            >
                                {bl.label}
                            </label>
                        </li>
                    ))}
                </ul>

                {/* ----- OVERLAY LAYERS ----- */}
                <div
                    style={{
                        padding: "8px 6px 2px 14px",
                        color: "#555",
                        fontWeight: 600,
                        fontSize: 15.2,
                    }}
                >
                    Overlays
                </div>
                <ul
                    style={{
                        listStyle: "none",
                        margin: 0,
                        paddingLeft: 0,
                        paddingTop: 2,
                        paddingBottom: 7,
                    }}
                >
                    {layers.map((layer) => (
                        <li
                            key={layer.name}
                            style={{
                                margin: "0 0 2px 0",
                                borderRadius: 8,
                                transition: "background 0.17s",
                                position: "relative",
                            }}
                        >
                            <label
                                htmlFor={`layer-toggle-${layer.name}`}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    cursor: "pointer",
                                    fontSize: 15.5,
                                    padding: "6px 10px 6px 16px",
                                    borderRadius: 8,
                                    transition: "background 0.16s",
                                }}
                                tabIndex={0}
                                onKeyUp={e => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        onToggle(layer.name);
                                    }
                                }}
                                onMouseEnter={e => {
                                    (e.currentTarget as any).style.background = "#f3f6fa";
                                }}
                                onMouseLeave={e => {
                                    (e.currentTarget as any).style.background = "";
                                }}
                            >
                                <input
                                    type="checkbox"
                                    checked={layer.visible}
                                    id={`layer-toggle-${layer.name}`}
                                    onChange={() => onToggle(layer.name)}
                                    style={{
                                        marginRight: 8,
                                        accentColor: "#3a6df0",
                                        width: 18,
                                        height: 18,
                                        cursor: "pointer",
                                    }}
                                />
                                {layer.legendUrl && (
                                    <img
                                        src={layer.legendUrl}
                                        alt="legend"
                                        style={{
                                            width: 28,
                                            height: 28,
                                            marginRight: 10,
                                            objectFit: "contain",
                                            background: "#fff",
                                            border: "1px solid #e3e7f4",
                                            borderRadius: 6,
                                            boxShadow: "0 0.5px 2px #cad3f16e",
                                        }}
                                    />
                                )}
                                <span
                                    style={{
                                        flex: 1,
                                        lineHeight: 1.1,
                                        letterSpacing: "0.02em",
                                        color: layer.visible ? "#234085" : "#7e819c",
                                        fontWeight: layer.visible ? 500 : 400,
                                        textShadow: layer.visible
                                            ? "0 1px 0 #f6fafd"
                                            : "none",
                                    }}
                                >
                  {layer.label}
                </span>
                            </label>
                        </li>
                    ))}
                    {layers.length === 0 && (
                        <li style={{ fontSize: 14, color: "#b6b8be", padding: "8px 18px" }}>
                            No overlays available
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};