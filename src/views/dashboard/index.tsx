import useTitle from "@/hooks/use-title";
import { ResponsiveCirclePacking } from '@nivo/circle-packing';
import { useState } from 'react';

const data = {
  "id": "nivo",
  "color": "hsl(277, 70%, 50%)",
  "children": [{
    "id": "cchart",
    "color": "hsl(72, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  },
  {
    "id": "xAxis",
    "color": "hsl(116, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  },
  {
    "id": "yAxis",
    "color": "hsl(179, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  },
  {
    "id": "layers",
    "color": "hsl(45, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  }, {
    "id": "outline",
    "color": "hsl(192, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  },
  {
    "id": "slices",
    "color": "hsl(141, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  },
  {
    "id": "bbox",
    "color": "hsl(48, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  }, {
    "id": "donut",
    "color": "hsl(208, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  },
  {
    "id": "gauge",
    "color": "hsl(258, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  }, {
    "id": "legends",
    "color": "hsl(332, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  }, {
    "id": "rgb",
    "color": "hsl(185, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  },
  {
    "id": "hsl",
    "color": "hsl(300, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  }, {
    "id": "randomize",
    "color": "hsl(46, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  },
  {
    "id": "resetCvaluek",
    "color": "hsl(353, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  },
  {
    "id": "noop",
    "color": "hsl(329, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  },
  {
    "id": "tick",
    "color": "hsl(19, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  },
  {
    "id": "forceGC",
    "color": "hsl(266, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  },
  {
    "id": "stackTrace",
    "color": "hsl(334, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  },
  {
    "id": "dbg",
    "color": "hsl(56, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  }, {
    "id": "address",
    "color": "hsl(162, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  },
  {
    "id": "city",
    "color": "hsl(315, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  },
  {
    "id": "animal",
    "color": "hsl(343, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  },
  {
    "id": "movie",
    "color": "hsl(222, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  },
  {
    "id": "user",
    "color": "hsl(311, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  }, {
    "id": "clone",
    "color": "hsl(84, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  },
  {
    "id": "intersect",
    "color": "hsl(347, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  },
  {
    "id": "merge",
    "color": "hsl(133, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  },
  {
    "id": "reverse",
    "color": "hsl(282, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  },
  {
    "id": "toArray",
    "color": "hsl(258, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  },
  {
    "id": "toObject",
    "color": "hsl(104, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  },
  {
    "id": "fromCSV",
    "color": "hsl(63, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  },
  {
    "id": "slice",
    "color": "hsl(296, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  },
  {
    "id": "append",
    "color": "hsl(0, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  },
  {
    "id": "prepend",
    "color": "hsl(167, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  },
  {
    "id": "shuffle",
    "color": "hsl(327, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  },
  {
    "id": "pick",
    "color": "hsl(98, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  },
  {
    "id": "plouc",
    "color": "hsl(326, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  }, {
    "id": "trim",
    "color": "hsl(261, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  },
  {
    "id": "slugify",
    "color": "hsl(265, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  },
  {
    "id": "snakeCase",
    "color": "hsl(98, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  },
  {
    "id": "camelCase",
    "color": "hsl(335, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  },
  {
    "id": "repeat",
    "color": "hsl(10, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  },
  {
    "id": "padLeft",
    "color": "hsl(236, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  },
  {
    "id": "padRight",
    "color": "hsl(320, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  },
  {
    "id": "sanitize",
    "color": "hsl(111, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  },
  {
    "id": "ploucify",
    "color": "hsl(7, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  }, {
    "id": "hey",
    "color": "hsl(253, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  },
  {
    "id": "HOWDY",
    "color": "hsl(67, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  },
  {
    "id": "aloha",
    "color": "hsl(136, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  },
  {
    "id": "AHOY",
    "color": "hsl(338, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  }, {
    "id": "pathB1",
    "color": "hsl(275, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  },
  {
    "id": "pathB2",
    "color": "hsl(31, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  },
  {
    "id": "pathB3",
    "color": "hsl(124, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  },
  {
    "id": "pathB4",
    "color": "hsl(88, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  }
    ,
  {
    "id": "pathC1",
    "color": "hsl(241, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  },
  {
    "id": "pathC2",
    "color": "hsl(221, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  },
  {
    "id": "pathC3",
    "color": "hsl(227, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  },
  {
    "id": "pathC4",
    "color": "hsl(105, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  },
  {
    "id": "pathC5",
    "color": "hsl(5, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  },
  {
    "id": "pathC6",
    "color": "hsl(117, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  },
  {
    "id": "pathC7",
    "color": "hsl(215, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  },
  {
    "id": "pathC8",
    "color": "hsl(307, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  },
  {
    "id": "pathC9",
    "color": "hsl(227, 70%, 50%)",
    "value": Math.floor(Math.random() * 100000)
  }
  ]
}

const Dashboard = () => {
  const [isLoading, setLoading] = useState("");

  useTitle('Dashboard')
  return (
    <div style={{
      width: '100%',
      height: '89vh'
    }}>
      <ResponsiveCirclePacking
        data={data}
        colorBy="id"
        id="id"
        value="value"
        leavesOnly
        motionConfig="slow"
        onClick={(e) => setLoading(e.id == isLoading ? '' : e.id)}
        zoomedId={isLoading}
        enableLabels
        labelsFilter={n => 2 === n.node.depth}
        labelsSkipRadius={10}
        isInteractive
      />
    </div>
  );
};

export default Dashboard;