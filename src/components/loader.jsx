import { motion } from "framer-motion";

export default function LoadingCircleSpinner({
  borderColor = "hsl(0, 0%, 98%)",
  className = "container",
}) {
  return (
    <div className={className}>
      <motion.div
        className="spinner"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <StyleSheet borderColor={borderColor} />
    </div>
  );
}

/**
 * ==============   Styles   ================
 */
function StyleSheet({ borderColor }) {
  return (
    <style>
      {`
            .container {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 40px;
                border-radius: 8px;
            }

            .spinner {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                border: 4px solid #ccc;
                border-top-color: ${borderColor} ;
                will-change: transform;
            }
            `}
    </style>
  );
}
