import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import styles from "./Trends.module.css";

export default function Trends({ data }) {
  return (
    <div className={styles.expenseChart}>
      <h2>Top Expenses</h2>

      <div className={styles.barWrapper}>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} layout="vertical" style={{ maxWidth: "35rem" }}>
            <XAxis type="number" axisLine={false} display="none" />
            <YAxis
              type="category"
              width={100}
              dataKey="name"
              axisLine={false}
            />
            <Bar dataKey="value" fill="#8884d8" barSize={25} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
