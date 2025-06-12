import React from "react";
import { Pagination, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

interface PaginationControlProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const PaginationControl: React.FC<PaginationControlProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <motion.div
      className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-sm text-default-500">
        Showing page {currentPage} of {totalPages}
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden sm:block">
          <Pagination
            total={totalPages}
            page={currentPage}
            onChange={onPageChange}
            color="primary"
            showControls
          />
        </div>

        <div className="flex sm:hidden gap-2">
          <Button
            isIconOnly
            variant="flat"
            isDisabled={currentPage === 1}
            onPress={() => onPageChange(currentPage - 1)}
            aria-label="Previous page"
          >
            <Icon icon="lucide:chevron-left" />
          </Button>

          <span className="flex items-center px-4 rounded-md bg-default-100">
            {currentPage} / {totalPages}
          </span>

          <Button
            isIconOnly
            variant="flat"
            isDisabled={currentPage === totalPages}
            onPress={() => onPageChange(currentPage + 1)}
            aria-label="Next page"
          >
            <Icon icon="lucide:chevron-right" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};