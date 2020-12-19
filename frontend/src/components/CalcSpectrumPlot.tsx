import React, { useState } from "react";
import { SpectraPoint } from "../constants";
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryZoomContainer,
  VictoryBrushContainer,
} from "victory";
import { DomainTuple } from "victory-core";
// pallette
// import { addSubscriptsToMolecule } from "../utils";

interface CalcSpectrumPlotProps {
  data: SpectraPoint[];
  molecule: string;
  minWavenumberRange: number;
  maxWavenumberRange: number;
}

interface Domain {
  x: DomainTuple;
  y: DomainTuple;
}

const CalcSpectrumPlot: React.FC<CalcSpectrumPlotProps> = ({
  data,
  molecule,
  minWavenumberRange,
  maxWavenumberRange,
}) => {
  molecule;

  const [selectedDomain, setSelectedDomain] = useState<Domain | undefined>(
    undefined
  );
  const [zoomDomain, setZoomDomain] = useState<Domain | undefined>(undefined);

  const handleZoom = (domain: Domain): void => setSelectedDomain(domain);
  const handleBrush = (domain: Domain): void => setZoomDomain(domain);

  const overviewHeight = 90;
  const [width, height] = [800, 600 - overviewHeight];

  return (
    <>
      <VictoryChart
        width={width}
        height={height}
        scale={{ x: "linear" }}
        containerComponent={
          <VictoryZoomContainer
            responsive={false}
            zoomDimension="x"
            zoomDomain={zoomDomain}
            onZoomDomainChange={handleZoom}
          />
        }
      >
        <VictoryLine
          style={{
            data: { stroke: "tomato" },
          }}
          data={data}
        />
      </VictoryChart>

      <VictoryChart
        width={width}
        height={overviewHeight}
        scale={{ x: "time" }}
        padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
        containerComponent={
          <VictoryBrushContainer
            responsive={false}
            brushDimension="x"
            brushDomain={selectedDomain}
            onBrushDomainChange={handleBrush}
          />
        }
      >
        <VictoryAxis
          tickValues={[minWavenumberRange, maxWavenumberRange]}
          tickFormat={(x) => x}
        />
        <VictoryLine
          style={{
            data: { stroke: "tomato" },
          }}
          data={data}
        />
      </VictoryChart>
    </>
  );
};

export default CalcSpectrumPlot;
