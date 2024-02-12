import React, { useMemo, useRef } from 'react';
import {
  darkTheme,
  GraphCanvas,
  GraphCanvasRef,
  GraphEdge,
  GraphNode,
  useSelection
} from '../../src';
import cyberJson from '../assets/cyber.json';
import fireSvg from '../assets/fire.svg';
import flagSvg from '../assets/flag.svg';
import userSvg from '../assets/user.svg';
import twitterSvg from '../assets/twitter.svg';
import keySvg from '../assets/key.svg';
import trumpSvg from '../assets/trump.svg';
import govSvg from '../assets/gov.svg';
import productSvg from '../assets/product.svg';
import missleSvg from '../assets/missle.svg';

export default {
  title: 'Demos/Use Cases',
  component: GraphCanvas
};

const iconMap = {
  Incident: fireSvg,
  Country: flagSvg,
  Province: flagSvg,
  Place: flagSvg,
  Continent: flagSvg,
  Username: userSvg,
  Person: userSvg,
  'twitter.com': twitterSvg,
  Keyphrase: keySvg,
  'Donald Trump': trumpSvg,
  GovernmentBody: govSvg,
  MilitaryEquipment: missleSvg,
  Product: productSvg
};

export const CyberSecurity = () => {
  const graphRef = useRef<GraphCanvasRef | null>(null);

  const [nodes, edges] = useMemo(() => {
    const n: GraphNode[] = [];
    const e: GraphEdge[] = [];

    for (const node of cyberJson) {
      const node1 = {
        id: node.ItemIdA,
        label: node.ItemDescriptionA,
        icon: iconMap[node.ItemTypeA] || iconMap[node.ItemDescriptionA]
      };

      if (!n.find(n => n.id === node1.id)) {
        n.push(node1);
      }

      const node2 = {
        id: node.ItemIdB,
        label: node.ItemDescriptionB,
        icon: iconMap[node.ItemTypeB] || iconMap[node.ItemDescriptionB]
      };

      if (!n.find(n => n.id === node2.id)) {
        n.push(node2);
      }

      const edge = {
        id: `${node1.id}-${node2.id}`,
        source: node1.id,
        target: node2.id
      };

      if (!e.find(e => e.id === edge.id)) {
        e.push(edge);
      }
    }

    return [
      n,
      e
    ];
  }, []);

  const {
    selections,
    actives,
    onNodeClick,
    onCanvasClick,
    onNodePointerOver,
    onNodePointerOut
  } = useSelection({
    ref: graphRef,
    nodes,
    edges,
    pathSelectionType: 'out'
  });

  return (
    <GraphCanvas
      selections={selections}
      actives={actives}
      onCanvasClick={onCanvasClick}
      onNodeClick={onNodeClick}
      onNodePointerOver={onNodePointerOver}
      onNodePointerOut={onNodePointerOut}
      ref={graphRef}
      labelType="nodes"
      nodes={nodes}
      edges={edges}
      theme={darkTheme}
      draggable
      layoutType="forceDirected2d"
      edgeInterpolation="curved"
    />
  );
};
